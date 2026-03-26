import { Eye, MoreHorizontal } from "lucide-react";

export default function LowStockCard(){

    return(
        <>
         <div className="flex flex-col w-full items-start gap-2 px-2 py-[6.1px] bg-[#fbbf24]/10 shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-[12px]  ">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                                         <div className="w-9 h-9 shadow-[inset_0px_0.2px_1px_rgba(0,0,0,0.2),inset_0px_-0.2px_1px_rgba(0,0,0,0.2)]  bg-gradient-to-b from-white/40 to-[#fc7348]/2 rounded-[8px] overflow-hiddeninset_0px_-1px_2px_rgba(0,0,0,0.2)] overflow-hidden">
                                           <img src={'/products.png'} alt="User image" height={28} width={28} className="object-contain w-full h-full" />
                                         </div>
                                         <div className="flex flex-col items-start ">
                                             <div className="text-[14px] font-medium">White plates 25cm</div>
                                              <div className="flex w-full items-center  text-xs text-[#1D1D1F]/50 ">
                                                   Stock: 12 (Min: 50)
                                             </div>
                                         </div>
                </div>
                <div className="flex items-center gap-1">
                                         <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 cursor-pointer transition-all duration-300 rounded">
                                         <Eye strokeWidth={1.7} className="w-4 h-4" />
                                         </button>
                                         <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 cursor-pointer transition-all duration-300 rounded">
                                         <MoreHorizontal strokeWidth={1.7} className="w-4 h-4" />
                                         </button>
                </div>
            </div>
         </div>
        </>
    )
}