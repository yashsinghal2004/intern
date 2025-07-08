"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const changeQty = (id, delta) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return (
      <div className="p-4">
        <h1 className="text-xl mb-4">Your Cart is Empty</h1>
        <Link href="/" className="underline">Go to Products</Link>
      </div>
    );

  return (
    <div className="max-w-2xl w-full mx-auto p-4">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex flex-col sm:flex-row items-center border-b py-2">
          <Image src={item.image} alt={item.title} width={60} height={60} className="object-contain" />
          <div className="flex-1 sm:ml-4 mt-2 sm:mt-0 w-full">
            <div className="font-bold text-sm sm:text-base">{item.title}</div>
            <div className="text-amber-700">Price: Rs. {item.price}</div>
            <div className="flex items-center mt-1">
              <button
                className="px-2 border"
                onClick={() => changeQty(item.id, -1)}
                disabled={item.qty === 1}
              >-</button>
              <span className="px-2">{item.qty}</span>
              <button
                className="px-2 border"
                onClick={() => changeQty(item.id, 1)}
              >+</button>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 sm:ml-4">
            <button
              className="px-2 py-1 border rounded bg-red-200 hover:bg-red-300"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="text-right mt-4 font-bold text-lg">Total: Rs. {total.toFixed(2)}</div>
      <Link href="/" className="mt-4 inline-block underline">Continue Shopping</Link>
    </div>
  );
}