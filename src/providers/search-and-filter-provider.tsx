"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";

export type SearchAndFilterForm = {
  search: string;
  category: string[];
};

export const defaultSearchAndFilterValues: SearchAndFilterForm = {
  search: "",
  category: [],
};

export default function SearchAndFilterFormProvider({
  children,
}: React.PropsWithChildren) {
  const searchAndFilterForm = useForm<SearchAndFilterForm>({
    defaultValues: defaultSearchAndFilterValues,
  });

  const searchParams = useSearchParams();
  const { setValue } = searchAndFilterForm;

  // useEffect
  React.useEffect(() => {
    // get query params for search and category
    const search = searchParams.get("search") || "";
    const category = searchParams.getAll("category");

    // set query params for search
    if (search) {
      setValue("search", search);
    }

    // set query params for category
    if (category.length > 0) {
      setValue("category", category);
    }
  }, [searchParams]);

  return <FormProvider {...searchAndFilterForm}>{children}</FormProvider>;
}
