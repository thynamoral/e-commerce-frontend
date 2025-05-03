import ProductsListForDashboard from "@/components/app/dashboard/products-list/products-list";
import AddProductProvider from "@/providers/add-product-provider";

export default function DashboardProductsPage() {
  return (
    <AddProductProvider>
      <ProductsListForDashboard />
    </AddProductProvider>
  );
}
