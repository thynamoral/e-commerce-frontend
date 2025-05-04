"use client";

import * as React from "react";
import { CategoryResponse } from "@/services/category/getCategories";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AddCategory from "../add-category/add-category";
import { useDeleteCategory } from "@/services/category/deleteCategory";

export const columns: ColumnDef<CategoryResponse>[] = [
  {
    accessorKey: "category_id",
    header: "Category ID",
  },
  {
    accessorKey: "category_name",
    header: "Category Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      const [open, setOpen] = React.useState(false);

      const { mutateAsync: deleteCategory } = useDeleteCategory();

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Update category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteCategory(category.category_id)}
              >
                Delete category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[400px]">
              <DialogTitle>Update category</DialogTitle>
              <div>
                <AddCategory category_id={category.category_id} />
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
