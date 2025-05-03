"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Props = {
  value: File | null | undefined;
  onChange: (file: File | null) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      e.target.value = "";
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Image size should be less than 5MB");
      e.target.value = "";
      return;
    }

    // preview image
    onChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // useEffect
  React.useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setSelectedImage(url);
      return () => URL.revokeObjectURL(url); // Cleanup
    } else if (typeof value === "string") {
      setSelectedImage(value); // it's already a URL
    } else {
      setSelectedImage(null);
    }
  }, [value]);

  return (
    <div className="w-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleButtonClick}
      >
        {selectedImage ? (
          <div className="w-full">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected"
              className="w-full h-64 object-contain rounded-md mb-4"
            />
            <p className="text-sm text-gray-500 text-center">
              Click to change image
            </p>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Upload className="h-8 w-8 text-gray-500" />
            </div>
            <p className="text-sm font-medium mb-1">Click to upload an image</p>
            <p className="text-xs text-gray-500">Images only, max 5MB</p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <Button onClick={handleButtonClick} className="w-full mt-4">
        {selectedImage ? "Change Image" : "Select Image"}
      </Button>
    </div>
  );
}
