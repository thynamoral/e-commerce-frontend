import ProductDetail from "@/components/app/products/product-detail";
import ContainerWrapper from "@/components/ui/container-wrapper";

export default function ProductDetailPage() {
  return (
    <ContainerWrapper className="max-w-5xl bg-white p-12">
      <ProductDetail />
    </ContainerWrapper>
  );
}
