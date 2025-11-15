import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: Array<{ value: number; label: string }>;
}

interface ApiResponse {
  total_score?: number;
  severity_category?: string;
  error?: string;
}

const scaleQuestions: Question[] = [
  {
    id: 'anxious_mood',
    text: '1. Anxious mood: Worries, anticipation of the worst, fearful anticipation, irritability.',
    options: [0, 1, 2, 3, 4].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'tension',
    text: '2. Tension: Feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax.',
    options: [0, 1, 2, 3, 4].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'fears',
    text: '3. Fears: Of dark, of strangers, of being left alone, of animals, of traffic, of crowds.',
    options: [0, 1, 2, 3, 4].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'insomnia',
    text: '4. Insomnia: Difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors.',
    options: [0, 1, 2, 3, 4].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'intellectual',
    text: '5. Intellectual: Difficulty in concentration, poor memory.',
    options: [0, 1, 2, 3, 4].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'depressed_mood',
    text: '6. Depressed mood: Loss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing.',
    options: [0, 1, 2, 3, 4].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'somatic_muscular',
    text: '7. Somatic (muscular): Pains and aches, twitching, stiffness, myoclonic jerks, grinding of teeth, unsteady voice, increased muscular tone.',
    options: [0, 1, 2, 3, 4].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'unexpected_upset',
    text: '8. Unexpected upset: In the last month, how often have you been upset because of something that happened unexpectedly?',
    options: [0, 1, 2, 3].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'lack_of_control',
    text: '9. Lack of control: In the last month, how often have you felt that you were unable to control the important things in your life?',
    options: [0, 1, 2, 3].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'nervous_stressed',
    text: '10. Nervous and stressed: In the last month, how often have you felt nervous and stressed?',
    options: [0, 1, 2, 3].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'confidence_handling_problems',
    text: '11. Confidence in handling problems: In the last month, how often have you felt confident about your ability to handle your personal problems?',
    options: [0, 1, 2, 3].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'things_going_way',
    text: '12. Things going your way: In the last month, how often have you felt that things were going your way?',
    options: [0, 1, 2, 3].map(value => ({ value, label: value.toString() }))
  },
  {
    id: 'coping_demands',
    text: '13. Coping with demands: In the last month, how often have you found that you could not cope with all the things that you had to do?',
    options: [0, 1, 2, 3].map(value => ({ value, label: value.toString() }))
  }
];

const descriptiveQuestions: Question[] = [
  {
    id: 'sadness',
    text: '14. Sadness',
    options: [
      { value: 0, label: 'I do not feel sad.' },
      { value: 1, label: 'I feel sad.' },
      { value: 2, label: 'I am sad all the time and I can\'t snap out of it.' },
      { value: 3, label: 'I am so sad and unhappy that I can\'t stand it.' }
    ]
  },
  {
    id: 'future_outlook',
    text: '15. Future outlook',
    options: [
      { value: 0, label: 'I am not particularly discouraged about the future.' },
      { value: 1, label: 'I feel discouraged about the future.' },
      { value: 2, label: 'I feel I have nothing to look forward to.' },
      { value: 3, label: 'I feel the future is hopeless and that things cannot improve.' }
    ]
  },
  {
    id: 'failure',
    text: '16. Failure',
    options: [
      { value: 0, label: 'I do not feel like a failure.' },
      { value: 1, label: 'I feel I have failed more than the average person.' },
      { value: 2, label: 'As I look back on my life, all I can see is a lot of failures.' },
      { value: 3, label: 'I feel I am a complete failure as a person.' }
    ]
  },
  {
    id: 'satisfaction',
    text: '17. Satisfaction',
    options: [
      { value: 0, label: 'I get as much satisfaction out of things as I used to.' },
      { value: 1, label: 'I don\'t enjoy things the way I used to.' },
      { value: 2, label: 'I don\'t get real satisfaction out of anything anymore.' },
      { value: 3, label: 'I am dissatisfied or bored with everything.' }
    ]
  },
  {
    id: 'guilt',
    text: '18. Guilt',
    options: [
      { value: 0, label: 'I don\'t feel particularly guilty.' },
      { value: 1, label: 'I feel guilty a good part of the time.' },
      { value: 2, label: 'I feel quite guilty most of the time.' },
      { value: 3, label: 'I feel guilty all of the time.' }
    ]
  },
  {
    id: 'irritation',
    text: '19. Irritation',
    options: [
      { value: 0, label: 'I am no more irritated by things than I ever was.' },
      { value: 1, label: 'I am slightly more irritated now than usual.' },
      { value: 2, label: 'I am quite annoyed or irritated a good deal of the time.' },
      { value: 3, label: 'I feel irritated all the time.' }
    ]
  },
  {
    id: 'sleep',
    text: '20. Sleep',
    options: [
      { value: 0, label: 'I can sleep as well as usual.' },
      { value: 1, label: 'I don\'t sleep as well as I used to.' },
      { value: 2, label: 'I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.' },
      { value: 3, label: 'I wake up several hours earlier than I used to and cannot get back to sleep.' }
    ]
  }
];

const questionIdToBackendKey: Record<string, string> = {
  anxious_mood: 'q1',
  tension: 'q2',
  fears: 'q3',
  insomnia: 'q4',
  intellectual: 'q5',
  depressed_mood: 'q6',
  somatic_muscular: 'q7',
  unexpected_upset: 'q8',
  lack_of_control: 'q9',
  nervous_stressed: 'q10',
  confidence_handling_problems: 'q11',
  things_going_way: 'q12',
  coping_demands: 'q13',
  sadness: 'q14',
  future_outlook: 'q15',
  failure: 'q16',
  satisfaction: 'q17',
  guilt: 'q18',
  irritation: 'q19',
  sleep: 'q20'
};

// YouTube recommendations by severity category (modified for "Severe to extreme")
const recommendations: Record<string, Array<{ text: string; searchQuery: string }>> = {
  'Low severity': [
    {
      text: 'Try a short mindfulness meditation to maintain calm.',
      searchQuery: '5-minute mindfulness meditation Headspace'
    },
    {
      text: 'Learn habits to boost daily happiness.',
      searchQuery: 'positive psychology tips Psych2Go'
    },
    {
      text: 'Practice gentle yoga for relaxation.',
      searchQuery: 'beginner yoga for relaxation Yoga With Adriene'
    }
  ],
  'Mild to moderate severity': [
    {
      text: 'Explore CBT techniques to manage anxious thoughts.',
      searchQuery: 'CBT techniques for anxiety Therapy in a Nutshell'
    },
    {
      text: 'Use guided breathing to reduce stress.',
      searchQuery: 'guided breathing for anxiety The Honest Guys'
    },
    {
      text: 'Practice self-compassion to ease guilt or sadness.',
      searchQuery: 'self-compassion meditation Tara Brach'
    }
  ],
  'Moderate to severe': [
    {
      text: 'Learn grounding techniques for anxiety relief.',
      searchQuery: 'grounding techniques for anxiety Anxiety Canada'
    },
    {
      text: 'Find strategies to cope with depression.',
      searchQuery: 'coping with depression Dr. Tracey Marks'
    },
    {
      text: 'Try progressive muscle relaxation to reduce tension.',
      searchQuery: 'progressive muscle relaxation guided Michael Sealey'
    }
  ],
  'Severe to extreme': [] // No recommendations
};

function Tests() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Map answers to backend format (q1-q20)
    const payload: Record<string, number> = {};
    Object.entries(answers).forEach(([questionId, value]) => {
      const backendKey = questionIdToBackendKey[questionId];
      if (backendKey) {
        payload[backendKey] = value;
      }
    });

    // Check if all questions are answered
    if (Object.keys(payload).length !== 20) {
      setError('Please answer all questions before submitting.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/calculate-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate score');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const QuestionComponent = ({ question }: { question: Question }) => (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={answers[question.id] === option.value}
              onChange={() => handleAnswerChange(question.id, option.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <ClipboardList className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Mental Health Assessment</h1>
          <p className="mt-2 text-gray-600">Please answer all questions honestly and to the best of your ability.</p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Scale Questions (0-4)</h2>
            {scaleQuestions.map(question => (
              <QuestionComponent key={question.id} question={question} />
            ))}
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Descriptive Questions</h2>
            {descriptiveQuestions.map(question => (
              <QuestionComponent key={question.id} question={question} />
            ))}
          </section>
        </div>

        <div className="mt-12 text-center">
          <button
            className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </div>

        {error && (
          <div className="mt-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && result.total_score !== undefined && (
          <div className="mt-6 text-center bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment Result</h2>
            <p className="text-gray-700">Total Score: <span className="font-medium">{result.total_score}</span></p>
            <p className="text-gray-700">Severity Category: <span className="font-medium">{result.severity_category}</span></p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">“You need to retake the test in 15 days.”</h2>
          </div>
        )}

        {result && result.severity_category && (
          <div className="mt-6 text-center bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Resources</h2>
            {result.severity_category === 'Severe to extreme' ? (
              <p className="text-red-600 text-lg">
                Your assessment indicates a severe condition. Please consult a doctor or mental health professional for support.
              </p>
            ) : (
              <>
                <p className="text-gray-600 mb-4">Explore these videos to support your mental wellness:</p>
                <ul className="text-left max-w-md mx-auto space-y-2">
                  {recommendations[result.severity_category].map((rec, idx) => (
                    <li key={idx} className="text-gray-700">
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(rec.searchQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {rec.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {result.severity_category === 'Severe to extreme' && (
              <p className="mt-4 text-red-600 text-sm">
                Note: Please consider reaching out to a professional or helpline (e.g., 988 in the U.S.) for immediate support.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tests;