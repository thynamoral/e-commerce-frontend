"use client";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Form, FormItem, FormLabel } from "./form";

export default function FilterInput() {
  const form = useForm();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-black-2">Filter By</h2>
        <Button
          size="sm"
          variant="link"
          className="text-xs text-black-3 hover:bg-main-gray hover:no-underline hover:cursor-pointer transition-transform duration-150 hover:-translate-x-1"
        >
          Clear Filter
        </Button>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <Form {...form}>
          <FormItem className="flex gap-3">
            <Checkbox />
            <FormLabel className="text-black-3">Men Clothes</FormLabel>
          </FormItem>
          <FormItem className="flex gap-3">
            <Checkbox />
            <FormLabel className="text-black-3">Women Clothes</FormLabel>
          </FormItem>
          <FormItem className="flex gap-3">
            <Checkbox />
            <FormLabel className="text-black-3">Shoes</FormLabel>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
