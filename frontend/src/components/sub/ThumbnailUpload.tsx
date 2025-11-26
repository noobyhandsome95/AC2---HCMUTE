// src/components/sub/ThumbnailUpload.tsx
import { useState, useRef } from "react";
import { FaCloudUploadAlt, FaImage } from "react-icons/fa";

export const ThumbnailUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <div 
      className="w-full h-full min-h-[120px] border-2 border-dashed border-slate-400 rounded-lg bg-black/20 hover:bg-black/30 hover:border-accent transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group"
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {preview ? (
        <img src={preview} alt="Thumbnail" className="w-full h-full object-cover absolute inset-0" />
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-300 group-hover:text-accent transition-colors p-4">
          <FaCloudUploadAlt size={32} className="mb-2" />
          <span className="text-sm font-medium">Click to upload thumbnail</span>
          <span className="text-xs text-slate-500 mt-1">(JPG, PNG, Max 5MB)</span>
        </div>
      )}
      
      {/* Overlay */}
      {preview && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-white font-medium flex items-center gap-2">
             <FaImage /> Change Image
           </span>
        </div>
      )}
    </div>
  );
};