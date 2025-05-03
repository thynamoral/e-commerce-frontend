"use client";

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
import { useRouter } from "next/navigation";

export const columns: ColumnDef<ProductsListForDashboardResponse>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      // get only the first image
      const image = row.original.product_images?.[0];
      return (
        <div className="flex items-center gap-2">
          <div className="relative w-[50px] h-[50px]">
            <Image
              src={image!.image_url}
              alt={row.original.product_slug}
              fill
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
      const router = useRouter();

      return (
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
            <DropdownMenuItem>Update product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const mockData: ProductsListForDashboardResponse[] = [
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
  {
    product_id: "67961c19-8f42-4354-8bbf-06934c3d7d85",
    product_name: "Men Striped Print Shirt",
    price: 150,
    product_slug: "men-striped-print-shirt",
    category_id: "82c7c32c-0bb9-43fc-ae30-6b61bfd4a29d",
    category_name: "Men Shirts",
    category_slug: "men-shirts",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "6b03ad8e-b6fc-4fd6-ba73-5571ebf71aaf",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745647256/momo-ecommerce/men-tshirt1-1745647254946.jpg",
      },
    ],
  },
  {
    product_id: "fb93ca94-a1da-4ad5-8b1a-3e2c49010a43",
    product_name: "Test Product",
    price: 150,
    product_slug: "test-product",
    category_id: "7342ab4d-7988-4745-a99b-c2a1c5d75c97",
    category_name: "Shoes",
    category_slug: "shoes",
    stock_quantity: 0,
    sold_out: 0,
    product_images: [
      {
        product_image_id: "bb9bb3ce-805a-42a5-8b3a-72ae56cf38b5",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574277/momo-ecommerce/61zxwkCv6PL._AC_UY1000_-1745574275444.jpg",
      },
      {
        product_image_id: "6a5d0c14-06e7-4b6d-abcc-34e93fa54b39",
        image_url:
          "https://res.cloudinary.com/dpx6vlmds/image/upload/v1745574278/momo-ecommerce/test_shoe-1745574275440.jpg",
      },
    ],
  },
];
