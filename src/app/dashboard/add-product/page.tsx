import AddProduct from "@/components/app/dashboard/add-product/add-product";
import AddProductProvider from "@/providers/add-product-provider";

export default function DashboardProductsAddProductPage() {
  return (
    <AddProductProvider>
      <AddProduct />
    </AddProductProvider>
  );
}
