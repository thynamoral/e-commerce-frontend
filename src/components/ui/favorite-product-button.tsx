"use client";
import { Heart } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

export default function FavoriteProductButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="absolute top-0 right-0 z-10 p-1.5">
      <Button
        variant="secondary"
        className="cursor-pointer rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          handleFavorite();
        }}
      >
        <Heart fill={isFavorite ? "black" : "none"} className="w-4 h-4" />
      </Button>
    </div>
  );
}
