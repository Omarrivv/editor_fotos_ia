
import type { Part } from "@google/genai";

export function fileToGenerativePart(file: File): Promise<Part> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        if (typeof reader.result !== 'string') {
            return reject(new Error("File could not be read as a data URL."));
        }
        // reader.result is "data:mime/type;base64,..."
        // We need to extract the base64 part
        const base64Data = reader.result.split(',')[1];
        resolve({
            inlineData: {
                data: base64Data,
                mimeType: file.type,
            },
        });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
