
import React, { useState, useCallback } from 'react';
import { ImageFile } from './types';
import { editImageWithGemini } from './services/geminiService';
import { fileToGenerativePart } from './utils/fileUtils';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';
import { MagicWandIcon } from './components/icons/MagicWandIcon';

export default function App() {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        file: file,
        previewUrl: reader.result as string,
      });
      setEditedImage(null); // Clear previous result when new image is uploaded
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const imagePart = await fileToGenerativePart(originalImage.file);
      const resultBase64 = await editImageWithGemini(imagePart, prompt);
      setEditedImage(`data:${imagePart.inlineData.mimeType};base64,${resultBase64}`);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);
  
  const generateExamplePrompt = () => {
    const examples = [
      "make this look like a professional photograph from the 1980s",
      "add a majestic castle in the background",
      "change the season to a snowy winter landscape",
      "turn this into a vibrant, colorful oil painting",
      "add a friendly golden retriever sitting next to the person",
      "make the sky look like a beautiful sunset with purple and orange clouds",
      "give the image a futuristic, cyberpunk aesthetic with neon lights",
    ];
    setPrompt(examples[Math.floor(Math.random() * examples.length)]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header />
        <main className="mt-8 p-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <div className="flex flex-col space-y-6">
              <ImageUploader onImageUpload={handleImageUpload} originalImagePreview={originalImage?.previewUrl ?? null} />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">Your Editing Instruction</label>
                  <button onClick={generateExamplePrompt} className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
                     <MagicWandIcon className="w-4 h-4 mr-1"/>
                     <span>Try an Example</span>
                  </button>
                </div>
                <PromptInput prompt={prompt} setPrompt={setPrompt} onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </div>
            
            {/* Result Panel */}
            <div className="relative min-h-[300px] lg:min-h-0">
               <ResultDisplay editedImage={editedImage} isLoading={isLoading} error={error} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
