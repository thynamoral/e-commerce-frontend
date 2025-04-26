import ProductCard from "@/components/ui/product-card";

export default function HomeProducts() {
  return (
    <div className="flex-1 p-4 space-y-3 bg-white rounded-md">
      <h2 className="font-bold">All Products</h2>
      <div className="grid grid-cols-3 gap-x-3 gap-y-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
