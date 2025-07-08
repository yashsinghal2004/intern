"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4">Product not found.</div>;

  return (
    <div className="max-w-lg w-full mx-auto p-4">
      <button className="mb-4 underline" onClick={() => router.back()}>&larr; Back</button>
      <div className="flex flex-col md:flex-row items-center border p-4 rounded bg-white">
        <Image src={product.image} alt={product.title} width={200} height={200} className="object-contain" />
        <div className="md:ml-6 mt-4 md:mt-0 w-full">
          <h1 className="text-xl font-bold">{product.title}</h1>
          <p className="text-lg mt-2 font-bold text-amber-700">Price: Rs. {product.price}</p>
          <p className="mt-2">{product.description}</p>
          <p className="mt-2 text-sm text-gray-500">Category: {product.category}</p>
          <p className="mt-2 text-sm text-yellow-600">Rating: {product.rating?.rate || "-"} ({product.rating?.count || 0} reviews)</p>
          <button
            className="mt-4 px-4 py-2 bg-amber-200 border rounded hover:bg-amber-300 w-full md:w-auto"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}