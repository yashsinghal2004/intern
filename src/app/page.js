import Image from "next/image";
import { useEffect, useState } from "react";

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

  return (
    <div>
      
    </div>
  );
}
