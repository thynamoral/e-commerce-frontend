import { Button } from "@/components/ui/button";
import ContainerWrapper from "@/components/ui/container-wrapper";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <ContainerWrapper className="flex flex-col gap-4 justify-center items-center bg-background">
      <h2 className="text-black-3 text-2xl font-bold">
        {"Oops, This page doesn't exist!"}
      </h2>
      <Button className="cursor-pointer">
        <Link href="/">Go back to home</Link>
      </Button>
    </ContainerWrapper>
  );
}
