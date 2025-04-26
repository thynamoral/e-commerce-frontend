import { cn } from "@/lib/utils";
import React from "react";

export default function ContainerWrapper({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("max-w-[1400px] w-full mx-auto mt-8 mb-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
