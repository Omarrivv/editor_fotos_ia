
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  }

  return (
    <div>
      <label
        htmlFor="image-upload"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Original Image
      </label>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileSelect}
        className="relative flex justify-center items-center w-full h-64 lg:h-full min-h-[200px] bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors duration-300 cursor-pointer overflow-hidden group"
      >
        {originalImagePreview ? (
          <>
            <img src={originalImagePreview} alt="Original preview" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <UploadIcon className="w-10 h-10 text-white/80" />
              <p className="mt-2 text-white font-semibold">Change Image</p>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400">
            <UploadIcon className="mx-auto h-12 w-12" />
            <p className="mt-2 font-semibold text-gray-300">Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </label>
       <input
        ref={fileInputRef}
        id="image-upload-input"
        name="image-upload"
        type="file"
        className="sr-only"
        accept="image/png, image/jpeg, image/gif, image/webp"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
