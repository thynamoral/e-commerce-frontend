import { Badge } from "@/components/ui/badge";

export default function FavoriteHeader() {
  return (
    <div className="flex justify-between border-b-2 border-neutral-200 pb-4 mb-4">
      <h2 className="text-xl font-bold">My Favorite Products</h2>
      <div className="text-right">
        <p className="text-lg font-medium">test3@test.com</p>
        <Badge variant="success">is verified</Badge>
      </div>
    </div>
  );
}
