"use client";

import { InitialProductsProps } from "@/app/(tabs)/products/page";
import ListProduct from "./ListProduct";
import { useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProducts: InitialProductsProps;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreItems = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-5 p-5">
      {products.map((product) => (
        <ListProduct {...product} key={product.id} />
      ))}
      <button
        onClick={loadMoreItems}
        disabled={isLoading}
        className="mx-auto w-fit rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold hover:opacity-90 active:scale-95"
      >
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
}
