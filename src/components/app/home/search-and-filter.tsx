import FilterInput from "./filter-input";
import SearchInput from "./search-input";

export default function SearchAndFilter() {
  return (
    <aside className="w-[350px] lg:max-h-[550px] sticky top-24 space-y-3 p-4 bg-white rounded-md">
      <h2 className="font-bold">Search</h2>
      <SearchInput />
      <FilterInput />
    </aside>
  );
}
