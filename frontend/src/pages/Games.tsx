import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import lion from './images/lion.jpg';
import tiger from './images/tiger.jpg';
import elephant from './images/elephant.jpg';
import giraffe from './images/giraffe.jpg';
import peacock from './images/peacock.jpg';
import deer from './images/deer.jpg';

interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardImages = [
  lion,
  tiger,
  elephant,
  giraffe,
  peacock,
  deer,
];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const gameBoardRef = useRef<HTMLDivElement>(null);

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const generateCardData = (level: 'easy' | 'medium' | 'hard'): string[] => {
    let totalCards = 16;
    if (level === 'medium') totalCards = 24;
    else if (level === 'hard') totalCards = 36;

    const images = [...cardImages];
    const cardData: string[] = [];
    while (cardData.length < totalCards) {
      images.forEach(img => {
        if (cardData.length < totalCards) cardData.push(img, img);
      });
    }
    return shuffleArray(cardData.slice(0, totalCards));
  };

  const initializeGame = (level: 'easy' | 'medium' | 'hard') => {
    setIsLoading(true);
    const cardData = generateCardData(level);
    const newCards = cardData.map((imageUrl, index) => ({
      id: index,
      imageUrl,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
    setFlippedCards([]);
    setIsLoading(false);
  };

  useEffect(() => {
    initializeGame(level);
  }, [level]);

  const handleCardClick = (id: number) => {
    if (isLoading || flippedCards.length === 2 || cards.find(c => c.id === id)?.isFlipped) return;

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, id]);

    if (flippedCards.length === 1) {
      setTimeout(() => checkMatch(), 1000);
    }
  };

  const checkMatch = () => {
    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard && secondCard && firstCard.imageUrl === secondCard.imageUrl) {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card
        )
      );
    } else {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card
        )
      );
    }
    setFlippedCards([]);
  };

  const handleRestart = () => {
    initializeGame(level);
  };

  const getGridTemplate = (level: 'easy' | 'medium' | 'hard') => {
    if (level === 'easy') return 'grid-cols-4 grid-rows-4';
    if (level === 'medium') return 'grid-cols-4 grid-rows-6';
    return 'grid-cols-6 grid-rows-6';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Memory Game</h1>
        <div className="mb-6">
          <div className="flex justify-center gap-4">
            {['easy', 'medium', 'hard'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl as 'easy' | 'medium' | 'hard')}
                className={`px-4 py-2 rounded-lg text-white ${
                  level === lvl ? 'bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'
                } transition-colors`}
              >
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={gameBoardRef}
          className={`grid gap-4 mb-6 ${getGridTemplate(level)}`}
        >
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                card.isFlipped || card.isMatched ? 'bg-white shadow-md' : ''
              }`}
            >
              {(card.isFlipped || card.isMatched) && (
                <img src={card.imageUrl} alt="card" className="w-3/4 h-3/4 object-contain" />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mx-auto block"
        >
          <RefreshCw className="inline mr-2" size={20} />
          Restart
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;