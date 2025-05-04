"use client";

import * as React from "react";
import { formatCurrency } from "@/lib/utils";
import { ProductsListForDashboardResponse } from "@/services/dashboard/getProductsListForDashboard";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddProduct from "../add-product/add-product";
import { useDeleteProduct } from "@/services/product/deleteProduct";

export const columns: ColumnDef<ProductsListForDashboardResponse>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      // get only the first image
      const image = row.original.product_images?.[0];
      return (
        <div className="flex items-center gap-2">
          <div>
            <Image
              src={image!.image_url}
              alt={row.original.product_slug}
              width={50}
              height={50}
              priority
              className="object-cover"
            />
          </div>
          <div>{row.original.product_name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left cursor-pointer"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left cursor-pointer"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{formatCurrency(row.original.price)}</div>,
  },
  {
    accessorKey: "stock_quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left cursor-pointer"
        >
          Stock Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sold_out",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left cursor-pointer"
        >
          Sold Out
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      const [open, setOpen] = React.useState(false);

      const { mutateAsync: deleteProduct } = useDeleteProduct();

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
              <a href={`/products/${product.product_id}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">
                  View product
                </DropdownMenuItem>
              </a>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Update product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteProduct(product.product_id)}
              >
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[1200px] max-w-[90vw]">
              <DialogTitle>Update product</DialogTitle>
              <div>
                <AddProduct productId={product.product_id} />
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
