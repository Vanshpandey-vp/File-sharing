import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-800 flex items-center justify-center px-4">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1612832021444-d9a7cfed5027?auto=format&fit=crop&w=1470&q=80')` }}></div>

      <div className="relative z-10 max-w-3xl text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
          Share & Access Files Easily  
          <span className="block text-yellow-300 mt-2">Publicly or Privately</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 font-light text-white/90">
          Upload important documents, secure them with access codes, or share them with everyone — all in one place.
        </p>

        <div className="flex justify-center space-x-4 flex-wrap">
          <Link to="/upload">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition shadow">
              Upload Now
            </button>
          </Link>
          <Link to="/public">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow">
              Explore Public Files
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
