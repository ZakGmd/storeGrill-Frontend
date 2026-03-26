import { CircleCheck, Star, MapPin, CalendarPlus, Package } from "lucide-react";


export default function SupplierCardPreview() {



    return(
        <>
         <div className="  max-w-[273px] overflow-hidden  flex flex-col items-start gap-4 rounded-xl px-3 py-2 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
             <div className="flex items-center gap-2 ">
               <div className="w-[58px] h-[58px] rounded-full  shadow-[inset_0px_1px_1px_rgba(0,0,0,0.5),inset_0px_-1px_1px_rgba(0,0,0,0.5)] overflow-hidden">
                <img loading="lazy" src={'/me.jpeg'} alt="User image" height={58} width={58} className="object-cover w-full h-full" />
               </div>
               <div className="flex flex-col items-start gap-1">
                  <div className="text-[#1D1D1F] tracking-3 font-medium">Zakaria Ghoumidate</div> 
                  <div className="text-[13px] px-1 bg-green-100 text-green-800 rounded-xl flex items-center gap-0.5"><CircleCheck size={14} strokeWidth={1} />Verified</div>
               </div>
                
             </div>
            
             <div className="flex flex-col items-start gap-2 w-full">
                <div className="text-[#1D1D1F]/70 text-[14px]">General:</div>
                  <div className="flex flex-col items-start gap-2 w-full">
                  <div className="w-full items-center flex justify-between">
                    <div className="flex items-center gap-1">
                        <Star size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                        <div className="text-[#1D1D1F]/70 text-[14px]">Avis</div>
                    </div>
                    <div className="text-[#1D1D1F] text-[14px] font-medium">187</div>
                </div>
                <div className="w-full items-center flex justify-between">
                    <div className="flex items-center gap-1">
                        <MapPin size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                        <div className="text-[#1D1D1F]/70 text-[14px]">Location</div>
                    </div>
                    <div className="text-[#1D1D1F] text-[14px] font-medium">Rabat</div>
                </div>
                 <div className="w-full items-center flex justify-between">
                    <div className="flex items-center gap-1">
                        <CalendarPlus size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                        <div className="text-[#1D1D1F]/70 text-[14px]">Experience</div>
                    </div>
                    <div className="text-[#1D1D1F] text-[14px] font-medium">5 mois</div>
                </div>
                <div className="w-full items-center flex justify-between">
                    <div className="flex items-center gap-1">
                        <Package size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                        <div className="text-[#1D1D1F]/70 text-[14px]">Commande min</div>
                    </div>
                    <div className="text-[#1D1D1F] text-[14px] font-medium">1000DH</div>
                </div>

             </div>
             </div>
            <div className="flex flex-col items-start gap-2 w-full">
                <div className="text-[#1D1D1F]/70 text-[14px]">Spécialisations:</div>
                <div className="mask-alpha mask-l-from-[#fafafa] mask-l-from-90% mask-t-from-100% mask-b-from-99% mask-r-from-90% mask-r-from-[#fafafa]">
                 <div className="flex items-center gap-1 ">
                 <div className="px-2 py-0.5 text-xs text-[#1D1D1F]/70  shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)]  backdrop-blur-lg bg-gray-200/20 rounded-[6px] truncate">Produits frais</div>
                 <div className="px-2 py-0.5 text-xs text-[#1D1D1F]/70  shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)]  backdrop-blur-lg bg-gray-200/20 rounded-[6px] truncate">Emporter</div>
                  <div className="px-2 py-0.5 text-xs text-[#1D1D1F]/70  shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)]  backdrop-blur-lg bg-gray-200/20 rounded-[6px] truncate">Vegetable</div>
                 

                 </div>
               </div>

            </div>
            <div className="w-full flex items-center gap-2">
                <div className="w-full px-3 py-2 text-center bg-[#fc7348]/80 cursor-pointer hover:bg-[#fc7348]/90 transition-all duration-300 text-white tracking-tight text-[14px] rounded-lg">See products</div>
            </div>
            </div>
        </>
       
    )
}