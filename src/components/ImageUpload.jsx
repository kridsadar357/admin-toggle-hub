import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

const ImageUpload = ({ label, onChange, multiple = false }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    if (multiple) {
      setPreviews(prev => [...prev, ...newPreviews].slice(0, 6));
      onChange(files);
    } else {
      setPreviews([newPreviews[0]]);
      onChange(files[0]);
    }
  };

  const removeImage = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    onChange(previews.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label className="text-gray-700">{label}</Label>
      <div className="flex flex-wrap gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {(!multiple || previews.length < 6) && (
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`file-${label}`}
              multiple={multiple}
            />
            <label
              htmlFor={`file-${label}`}
              className="cursor-pointer flex items-center justify-center w-full h-full"
            >
              <Plus className="text-gray-400" size={24} />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
