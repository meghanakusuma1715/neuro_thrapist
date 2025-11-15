import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">NeuroNest</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/home" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/therapy" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Therapy
              </Link>
              <Link to="/tests" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Tests
              </Link>
              <Link to="/chatbot" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Chatbot
              </Link>
              <Link to="/games" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Games
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT339AnqbQ6TIa8H3jecoy44ngUymuMktA0L0tkfTRKJsUxu2MDNBdPaS6MiEaPxVT6mk&usqp=CAU")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              NeuroNest – Where Minds Heal and Grow
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              A digital sanctuary guiding you through personalized neurotherapy.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">About Us</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to NeuroNest, your virtual companion on the journey to better mental wellness. 
                We combine the power of AI with therapeutic guidance to offer a personalized experience 
                tailored to your emotional and cognitive needs.
              </p>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                We believe mental health support should be accessible, comforting, and personalized – 
                and that's exactly what we're here to deliver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;