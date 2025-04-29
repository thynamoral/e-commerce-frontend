"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { SearchAndFilterForm } from "@/providers/search-and-filter-provider";
import InputWrapper from "@/wrappers/input-wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProducts } from "@/services/product/getProducts";

export default function SearchInput() {
  const { control, setValue, getValues, watch } =
    useFormContext<SearchAndFilterForm>();
  const router = useRouter();
  const searchParams = useSearchParams();

  // services
  const { data } = useGetProducts({
    search: searchParams.get("search") || "",
    category: searchParams.getAll("category"),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchValue = getValues("search").trim();

      const params = new URLSearchParams(window.location.search);
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
      console.log(`Clicked Search`);
    }
  };

  // useEffect
  // React.useEffect(() => {
  //   const search = searchParams.get("search") || "";
  //   setValue("search", search);

  //   const fetchProducts = async () => {
  //     if (search) {
  //       console.log(`Clicked Search`);
  //       // await searchProducts({ search });
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="flex-1 h-10 relative rounded-md outline-none">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 " />
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <InputWrapper
            field={field}
            className="pl-8 h-10"
            placeholder="What are you looking for?"
            onKeyDown={handleKeyDown}
          />
        )}
      />
    </div>
  );
}
