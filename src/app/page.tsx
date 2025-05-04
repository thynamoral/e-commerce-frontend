import HomeProducts from "@/components/app/home/home-products";
import ContainerWrapper from "@/components/ui/container-wrapper";
import SearchAndFilter from "@/components/app/home/search-and-filter";
import SearchAndFilterFormProvider from "@/providers/search-and-filter-provider";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";

export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchAndFilterFormProvider>
        <ContainerWrapper className="flex flex-col gap-4 lg:min-h-full lg:flex-row">
          <SearchAndFilter />
          <HomeProducts />
        </ContainerWrapper>
      </SearchAndFilterFormProvider>
    </Suspense>
  );
}
