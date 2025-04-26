import SearchAndFilter from "@/components/ui/search-and-filter";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1400px] w-full lg:min-h-full flex gap-4 mx-auto pt-8 pb-12">
      <SearchAndFilter />
      <div>Home</div>
    </div>
  );
}
