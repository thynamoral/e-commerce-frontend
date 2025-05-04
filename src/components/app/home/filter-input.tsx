"use client";
import { SearchAndFilterForm } from "@/providers/search-and-filter-provider";
import { useGetCategories } from "@/services/category/getCategories";
import CheckboxWrapper from "@/wrappers/checkbox-wrapper";
import { useRouter } from "next/navigation";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormItem } from "@/components/ui/form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function FilterInput() {
  const form = useForm();
  const { control, getValues, setValue } =
    useFormContext<SearchAndFilterForm>();
  const router = useRouter();

  // data from api
  const { data: categories } = useGetCategories();

  // handling functions
  const handleClearFilter = () => {
    const params = new URLSearchParams(window.location.search);
    setValue("category", []);
    params.delete("category");
    router.push(`?${params.toString()}`);
  };

  const handleOnCheckedChange = (
    checked: boolean,
    onChange: (...event: any[]) => void,
    allValues: string[],
    currentValue: string
  ) => {
    const params = new URLSearchParams(window.location.search);

    // clear search query params
    const searchValue = getValues("search").trim();
    if (searchValue) {
      params.delete("search");
      setValue("search", "");
    }

    let newValues: string[];

    if (checked) {
      newValues = [...allValues, currentValue];
    } else {
      newValues = allValues.filter((item) => item !== currentValue);
    }

    // Clear all existing "category" entries to query params
    params.delete("category");

    // Add all the new "category" values to query params
    newValues.forEach((value) => {
      params.append("category", value);
    });

    onChange(newValues);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-black-2">Filter By</h2>
        <Button
          size="sm"
          variant="link"
          className="text-xs text-black-3 hover:bg-main-gray hover:no-underline hover:cursor-pointer transition-transform duration-150 hover:-translate-x-1"
          onClick={handleClearFilter}
        >
          Clear Filter
        </Button>
      </div>
      <ScrollArea className="w-full h-12 whitespace-nowrap lg:h-auto">
        <div className="w-max flex flex-row gap-3 mt-3 lg:flex-col">
          <Form {...form}>
            {categories?.map((category) => (
              <FormItem key={category.category_id} className="flex gap-3">
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => {
                    const { value, onChange } = field;
                    const isChecked = value?.includes(category.slug);
                    return (
                      <CheckboxWrapper
                        id={category.category_id}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleOnCheckedChange(
                            checked,
                            onChange,
                            value,
                            category.slug
                          )
                        }
                      >
                        {category.category_name}
                      </CheckboxWrapper>
                    );
                  }}
                />
              </FormItem>
            ))}
          </Form>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
