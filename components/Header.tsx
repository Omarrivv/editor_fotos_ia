
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-block bg-purple-600/10 p-4 rounded-full">
        <div className="inline-block bg-purple-600/20 p-3 rounded-full">
          <MagicWandIcon className="w-10 h-10 text-purple-400" />
        </div>
      </div>
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Gemini AI Photo Editor
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-400">
        Transform your images with the power of generative AI. Upload a photo, describe your vision, and watch it come to life.
      </p>
    </header>
  );
};

export default Header;
