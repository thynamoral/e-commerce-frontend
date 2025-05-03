import { CategoryResponse } from "@/services/category/getCategories";
import { ColumnDef } from "@tanstack/react-table";

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
];
