import { Search } from "lucide-react";
import { Input } from "./input";

export default function SearchInput() {
  return (
    <div className="flex-1 h-10 relative bg-black/5 rounded-md outline-none">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 " />
      <Input
        type="search"
        className="pl-8 h-10"
        placeholder="What are you looking for?"
      />
    </div>
  );
}
