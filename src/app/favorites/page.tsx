import Favorite from "@/components/app/favorites/favorite";
import ContainerWrapper from "@/components/ui/container-wrapper";

export default function FavoritePage() {
  return (
    <ContainerWrapper className="p-4 bg-background rounded-md">
      <Favorite />
    </ContainerWrapper>
  );
}
