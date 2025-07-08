"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductCard=({image,title,price})=>{
  return(
    <div className="flex border p-2 w-sm flex-wrap flex-col m-2">
      <Image src={image} alt={title} width={200} height={200} />
      <h2>{title}</h2>
      <p>Price: Rs. {price}</p>
    </div>
  )
}

export default function Home() {
  const[products,setProducts]=useState([]);

  const fetchData=async ()=>{
    const data=await fetch("https://fakestoreapi.in/api/products?limit=150")
    const json=await data.json();
    setProducts(json.products);
  }
  useEffect(()=>{
    fetchData();
  },[]);

  return !products.length ?<h1>No Products</h1> : (
    <div >
      <div className="flex flex-wrap">
      {
        products.map((prod)=>(
          <ProductCard key={prod.id} title={prod.title} image={prod.image} price={prod.price}/>
        ))
      }
      </div>
    </div>
  );
}
