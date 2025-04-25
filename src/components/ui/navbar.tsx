import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "./badge";
import SearchInput from "./search-input";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-background border-b shadow-md">
      <div className="max-w-[1400px] h-16 flex items-center justify-between mx-auto px-[1rem]">
        <div className="flex max-w-3xl w-full items-center">
          <Link href="/" className="font-bold mr-4">
            Momo E-Commerce
          </Link>
          <SearchInput />
        </div>
        <div className="flex gap-6">
          <Link href="/favorites">
            <Heart />
          </Link>
          <Link href="/favorites">
            <User />
          </Link>
        </div>
      </div>
    </header>
  );
}
