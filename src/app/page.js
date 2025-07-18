"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = React.forwardRef(({ id, image, title, price }, ref) => (
  <Link href={`/product/${id}`}>
    <div
      ref={ref}
      className="flex flex-col border p-2 m-1 bg-white hover:shadow-lg transition w-full max-w-xs"
    >
      <Image className="mx-auto" src={image} alt={title} width={100} height={100} />
      <h2 className="mt-2 text-base font-semibold line-clamp-2">{title}</h2>
      <p className="pt-3 font-bold text-amber-700">Price: Rs. {price}</p>
    </div>
  </Link>
));
ProductCard.displayName = "ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const lastProductRef = useRef();

  useEffect(() => {
    fetch("https://fakestoreapi.in/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const fetchProducts = async (page, category = selectedCategory, size = pageSize) => {
    setLoading(true);
    let url = category
      ? `https://fakestoreapi.in/api/categories/${category}/products?page=${page}&limit=${size}`
      : `https://fakestoreapi.in/api/products?page=${page}&limit=${size}`;
    const res = await fetch(url);
    const json = await res.json();

    const newProducts = json.products || [];
    if (json.total) setTotalProducts(json.total);
    if (!json.total && newProducts.length < size) setHasMore(false);
    setProducts((prev) => (page === 1 ? newProducts : [...prev, ...newProducts]));
    setHasMore(newProducts.length === size);
    setPagesLoaded((prev) => (page > prev ? page : prev));
    setLoading(false);
  };

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setPagesLoaded(1);
    setHasMore(true);
    setPageSize(16);
    fetchProducts(1, selectedCategory, 16);
  }, [selectedCategory]);

  useEffect(() => {
    if (loading || !hasMore) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => {
            const nextPage = prev + 1;
            setPageSize(8);
            fetchProducts(nextPage, selectedCategory, 8);
            return nextPage;
          });
        }
      },
      { threshold: 1.0 }
    );
    if (lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }
    return () => {
      if (lastProductRef.current) {
        observer.unobserve(lastProductRef.current);
      }
    };
  }, [loading, hasMore, products, selectedCategory]);

  const totalPages = totalProducts
    ? 1 + Math.ceil((totalProducts - 16) / 8)
    : pagesLoaded;

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    setProducts([]);
    setHasMore(true);
    if (pageNum === 1) {
      setPageSize(16);
      fetchProducts(1, selectedCategory, 16);
    } else {
      setPageSize(8);
      fetchProducts(pageNum, selectedCategory, 8);
    }
    setPagesLoaded(pageNum);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-2">
      <h1 className="flex justify-center items-center text-2xl p-2 font-bold">Product-Catalog</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center p-2 gap-2">
        <select
          className="border p-2 rounded w-full sm:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.slug || cat} value={cat.slug || cat}>
              {cat.name || cat}
            </option>
          ))}
        </select>
        <Link href="/cart" className="px-4 py-2 border rounded bg-amber-200 hover:bg-amber-300 w-full sm:w-auto text-center">
          Cart
        </Link>
      </div>
      <div className="flex justify-center items-center p-1 overflow-x-auto">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n + 1}
            className={`p-2 m-0.5 border cursor-pointer hover:bg-amber-200 ${n + 1 === currentPage ? "bg-amber-200" : ""}`}
            onClick={() => handlePageClick(n + 1)}
          >
            {n + 1}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {products.map((prod, idx) => {
          const isLast = idx === products.length - 4;
          return (
            <ProductCard
              key={prod.id}
              ref={isLast ? lastProductRef : null}
              id={prod.id}
              title={prod.title}
              image={prod.image}
              price={prod.price}
            />
          );
        })}
      </div>
      {loading && (
        <div className="flex justify-center items-center p-4">
          <span className="text-lg">Loading...</span>
        </div>
      )}
      {!hasMore && !loading && (
        <div className="flex justify-center items-center p-4">
          <span className="text-gray-500">No more products</span>
        </div>
      )}
    </div>
  );
}