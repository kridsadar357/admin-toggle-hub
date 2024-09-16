import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const ImageUpload = ({ label, onChange }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-blue-600">{label}</Label>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 border-2 border-dashed border-blue-300 flex items-center justify-center rounded-lg overflow-hidden">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Plus className="text-blue-300" size={24} />
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`file-${label}`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(`file-${label}`).click()}
          className="text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          Upload {label}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;