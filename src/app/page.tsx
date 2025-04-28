import HomeProducts from "@/components/app/home/home-products";
import ContainerWrapper from "@/components/ui/container-wrapper";
import SearchAndFilter from "@/components/ui/search-and-filter";
import SearchAndFilterFormProvider from "@/providers/search-and-filter-provider";

export default function Home() {
  return (
    <SearchAndFilterFormProvider>
      <ContainerWrapper className="lg:min-h-full flex gap-4">
        <SearchAndFilter />
        <HomeProducts />
      </ContainerWrapper>
    </SearchAndFilterFormProvider>
  );
}
