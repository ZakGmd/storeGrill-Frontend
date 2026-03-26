import { Star, ChevronDownCircle } from "lucide-react"
import { useState } from "react"


export default function ProductCard(product: any){
   const [isHovred , setHovred] = useState(false)
 
    return(
        <>
         <div
            key={product.id}
            className="bg-[#FAFAFA]  relative border-[0.5px] border-gray-200/40 rounded-lg  overflow-hidden px-1 py-1"
            onPointerEnter={()=>{
             setHovred(true)
            }}
            onPointerLeave={()=>{
             setHovred(false)
            }}
            >
            <div className="relative border-[0.5px] bg-white border-gray-300/50 rounded-lg ">
                             <img
                               src={"/products.png"}
                               alt={product.name}
                               className="w-full h-56 object-cover"
                             />
            </div>
            <div className="flex flex-col items-start gap-1 w-full px-1 pt-3">
                             <h3 className="font-medium text-gray-900 leading-3.5 ">{product.name}</h3>
                             <p className="text-sm text-gray-600 ">{product.category}</p>
         
                             <div className="flex items-center justify-between w-full">
                               <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                               <div className="flex items-center gap-1">
                                 <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                 <span className="text-sm text-gray-600">4.6</span>
                               </div>
                             </div>
            </div>
            {isHovred && (
             <div className={`absolute h-21 px-1   ${ isHovred ? "translate-y-0 transform-all transition-all ease-linear duration-200  " : "translate-y-0 transform-all transition-all ease-linear duration-200 " }  w-full bottom-0 left-0`}>
                             <div className="bg-white/1 backdrop-blur-[6px] q border-[0.5px] border-gray-300/50 border-b-0 px-2 gap-3 py-1 flex flex-col h-full w-full rounded-t-lg">
                                 <div className="w-full justify-between flex items-center">
                                     <div className="text-[#1D1D1F] text-[16px] leading-5">Actions</div>
                                     <ChevronDownCircle className="w-4 h-4 text-gray-400 min-w-[18px]" strokeWidth={1.5}  />
                                 </div>
                                 <div className="grid grid-cols-3 w-full items-center gap-3">
                                     <div className="px-3 py-1 rounded-lg text-center ">Delete</div>
                                      <div className="px-3 py-1 rounded-lg text-center border border-[#fc7348]/80">View</div>
                                     <div className="px-3 py-1 rounded-lg text-center bg-[#fc7348]/80 text-white">Edit</div>
                                 </div>
                             </div>
             </div>  
            )}
                           
        </div>
        </>
    )
}