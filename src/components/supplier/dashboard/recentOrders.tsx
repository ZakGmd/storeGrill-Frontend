import { Eye, MoreHorizontal } from "lucide-react";


export default function RecendOrders(){

    return(
        <>
        <div className="grid grid-cols-12 pb-2  border-b border-t border-t-transparent border-b-[#1D1D1F]/5 items-center">
            <div className="flex items-center col-span-2 gap-2">
                <div className="w-5 h-5 shadow-[inset_0px_0.5px_2px_rgba(0,0,0,0.2),inset_0px_-0.5px_2px_rgba(0,0,0,0.2)]  bg-gradient-to-b from-white/40 to-[#fc7348]/30  rounded-full overflow-hidden">
                 <img src={'/products.png'} alt="User image" height={28} width={28} className="object-contain w-full h-full" />
                </div>
                <div className="text-[14px] text-[#1D1D1F]">#CMD-001</div>
            </div>
            <div className="flex col-span-2 items-center justify-center  text-[14px] text-[#1D1D1F] truncate underline">Grill vibe restaurant</div>
            <div className="col-span-2 flex items-center justify-end">
              <div className="flex items-center justify-center text-[14px] text-[#1D1D1F] truncate">X25 Gold tea glasses</div>
            </div>
            <div className="col-span-2 flex items-center justify-end">
                            <div className=" text-[14px] px-2  text-xs rounded-full bg-blue-100 text-blue-700">In progress</div>
            </div>
            <div className="col-span-2 flex items-center justify-end">
             <div className="flex items-center justify-center font-medium text-[14px] text-[#1D1D1F]">4,361 DH</div>
            </div>
            <div className="flex items-center col-span-2 justify-end  space-x-1 ">
                            <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 cursor-pointer transition-all duration-300 rounded">
                            <Eye strokeWidth={1.7} className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 cursor-pointer transition-all duration-300 rounded">
                            <MoreHorizontal strokeWidth={1.7} className="w-4 h-4" />
                            </button>
            </div>
        </div>
        </>
    )
}