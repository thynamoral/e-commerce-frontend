import { Heart } from "lucide-react";
import { Button } from "./button";

type Props = {
  isFavorite: boolean;
};

export default function FavoriteProductButton({ isFavorite = false }: Props) {
  return (
    <div className="absolute top-0 right-0 z-10 p-1.5">
      <Button variant="secondary" className="rounded-full">
        <Heart fill={isFavorite ? "black" : "none"} className="w-4 h-4" />
      </Button>
    </div>
  );
}
