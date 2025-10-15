
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ResultDisplayProps {
  editedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col justify-center items-center text-center text-gray-400">
        <svg className="animate-spin h-12 w-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-gray-300">Generating your masterpiece...</p>
        <p className="text-sm">This can take a moment, the AI is hard at work.</p>
    </div>
);


const Placeholder: React.FC = () => (
  <div className="text-center text-gray-500">
    <SparklesIcon className="mx-auto h-16 w-16 opacity-30" />
    <h3 className="mt-2 text-lg font-medium text-gray-300">Your edited image will appear here</h3>
    <p className="mt-1 text-sm">Upload an image and write a prompt to get started.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center text-red-400 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
        <h3 className="font-bold">An Error Occurred</h3>
        <p className="text-sm">{message}</p>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ editedImage, isLoading, error }) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-900/50 rounded-lg border border-gray-700 p-4">
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorDisplay message={error} />}
      {!isLoading && !error && editedImage && (
        <img src={editedImage} alt="Edited result" className="max-w-full max-h-full object-contain rounded-md shadow-lg"/>
      )}
      {!isLoading && !error && !editedImage && <Placeholder />}
    </div>
  );
};

export default ResultDisplay;
