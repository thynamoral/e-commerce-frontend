import FilterInput from "./filter-input";
import SearchInput from "./search-input";

export default function SearchAndFilter() {
  return (
    <aside className="w-[350px] space-y-3 p-4 bg-white rounded-md">
      <h2 className="font-bold">Search</h2>
      <SearchInput />
      <FilterInput />
    </aside>
  );
}
