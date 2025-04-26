import HomeProducts from "@/components/app/home/home-products";
import ContainerWrapper from "@/components/ui/container-wrapper";
import SearchAndFilter from "@/components/ui/search-and-filter";

export default function Home() {
  return (
    <ContainerWrapper className="lg:min-h-full flex gap-4">
      <SearchAndFilter />
      <HomeProducts />
    </ContainerWrapper>
  );
}
