"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


const ProductCard=({image,title,price})=>{
  return(
    <div className="flex border p-2 w-50 h-auto flex-wrap flex-col m-1">
      <Image className="flex items-center justify-center" src={image} alt={title} width={100} height={100} />
      <h2>{title}</h2>
      <p className="pt-3">Price: Rs. {price}</p>
    </div>
  )
}

const PAGE_SIZE=8;

export default function Home() {
  const[products,setProducts]=useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData=async ()=>{
    const data=await fetch("https://fakestoreapi.in/api/products?limit=150")
    const json=await data.json();
    setProducts(json.products);
  }
  useEffect(()=>{
    fetchData();
  },[]);

  const tot_products=products.length;
  const noofpages=Math.ceil(tot_products/PAGE_SIZE);

  const start=currentPage* PAGE_SIZE;
  const end=start+PAGE_SIZE;

  const handlePageChange=(n)=>{
    setCurrentPage(n);
  }

  const handlePrevPage=()=>{
    setCurrentPage((prev)=>prev-1);
  }

  const handleNextPage=()=>{
    setCurrentPage((prev)=>prev+1);
  }

  return !products.length ?<h1>No Products</h1> : (
    <div >
      <h1 className="justify-center items-center flex text-2xl p-2">Product-Catalog</h1>
      <div className="justify-center items-center flex p-1 ">
        
        {[...Array(noofpages).keys()].map((n)=>(<button 
        className={`p-2 m-0.5 border cursor-pointer hover:bg-amber-200 ${n === currentPage ? "bg-amber-200" : ""}`}

         key={n} 
          onClick={()=>handlePageChange(n)}>
          {n}
          </button>))}
          
      </div>
      <div className="justify-center items-center flex">
      <button hidden={currentPage===0} className="p-1 m-0.5 border cursor-pointer" onClick={()=>handlePrevPage()} >◀ </button>
      <button hidden={currentPage===noofpages-1} className="p-1 m-0.5 border cursor-pointer" onClick={()=>handleNextPage()}>▶</button>
          </div>   
      <div className="flex flex-wrap">
      {
        products.slice(start,end).map((prod)=>(
          <ProductCard key={prod.id} title={prod.title} image={prod.image} price={prod.price}/>
        ))
      }
      </div>
    </div>
  );
}
