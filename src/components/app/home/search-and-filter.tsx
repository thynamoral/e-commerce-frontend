import FilterInput from "./filter-input";
import SearchInput from "./search-input";

export default function SearchAndFilter() {
  return (
    <aside className="sticky top-24 space-y-3 p-4 bg-white z-20 rounded-md w-full h-auto lg:w-[300px] lg:max-h-[550px] max-lg:top-16">
      <h2 className="font-bold">Search</h2>
      <SearchInput />
      <FilterInput />
    </aside>
  );
}
