import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const ProductsTable : React.FC = () =>{
    const [product,setproduct] = useState([]);


    useEffect(()=>{
       fetch("/data/products.json")
       .then(res=> res.json())
       .then(data=> setproduct(data.products)) 
    },[])


    return(
        <motion.div>
            <h1>All Products</h1>
            <div className="overflow-x-auto mt-4 rounded-lg">
                <table className="min-w-full bg-[#1e1e1e] backdrop-blur-2xl rounded-lg ">
                    <thead>
                        <tr className="bg-gray-700 border-b">
                            <th className="py-4 px-4 text-center">Product Name</th>
                            <th className="py-4 px-4 text-center">Category</th>
                            <th className="py-4 px-4 text-center">Price</th>
                            <th className="py-4 px-4 text-center">Stock</th>
                        </tr>
                        {product.map((Products: any) => (
                            <tr key={Products.id} className="hover:bg-gray-600 transition-colors cursor-pointer">
                                <td className="py-4 px-4 text-center">{Products.name}</td>
                                <td className="py-4 px-4 text-center">{Products.category}</td>
                                <td className="py-4 px-4 text-center">${Products.price.toFixed(2)}</td>
                                <td className="py-4 px-4 text-center">{Products.stock}</td>
                            </tr>
                        ))}

                    </thead>
                </table>
            </div>
        </motion.div>
    )
}


export default ProductsTable