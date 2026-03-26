import { Boxes, CalendarPlus, CircleCheck, MapPin, Package, Pen, Star } from "lucide-react";
import FormField from "../../components/supplier/settings/formField";


export default function Settings() {

    return(
        <>
        <div className="flex items-start gap-[64px] max-w-max mx-auto mb-4 py-2">
          <div className="settings flex flex-col items-start gap-6  py-2 h-screen pr-4  overflow-y-scroll">
           <div className="flex flex-col items-start gap-6 ">
         
           <div className="flex flex-col items-start gap-1 ">
              <div className="text-xl font-semibold text-[#1D1D1F]">Profile public</div>
              <div className="text-[#1D1D1F] tracking-3">Manage your profile display and public information.</div>
            </div>   
            <div className="flex flex-col items-start gap-5">
              
                <FormField name="Username" placeholder="Zakaria Ghoumidate" />
                <FormField name="Bio" placeholder="Supplier with best prices"/>
                
            </div>
          </div>
          <div className="flex items-center w-full justify-center">
            <div className=" w-25 h-[2px] rounded-full bg-black/10"></div>
          </div>
          <div className="flex flex-col items-start gap-6">
         
           <div className="flex flex-col items-start gap-1 ">
              <div className="text-xl font-semibold text-[#1D1D1F]">Private profile</div>
              <div className="text-[#1D1D1F] tracking-3">Manage your profile display and public information.</div>
            </div>   
            <div className="flex flex-col items-start gap-5">
                <FormField name="Username" placeholder="Zakaria Ghoumidate" />
                <FormField name="Email" placeholder="GhoumidateZakaria@gmail.com"/>
                <FormField name="Phone" placeholder="0633-523727" />
                <FormField name="Password" placeholder="***************" />
                <div className="flex h-12 py-1 px-1 pl-5 justify-between bg-[#FAFAFA]  items-center gap-5 self-stretch shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-xl">
                    <div className="text-base font-normal leading-6 tracking-tight-3 ">Delete account</div>
                   
                    
                    <div className="flex h-10 px-3 py-2.5 justify-center bg-gray-200/30 hover:bg-red-50 transtion-all duration-200 hover:shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer items-center gap-1.5 rounded-xl">
                      
                        <div className="text-sm font-normal text-[#FF5E5B] ">Delete</div>
                    </div>
                </div>
            </div>
          </div>
          <div className="flex items-center w-full justify-center">
            <div className=" w-25 h-[2px] rounded-full bg-black/10"></div>
          </div>
          <div className="flex flex-col items-start gap-6">
         
           <div className="flex flex-col items-start gap-1 ">
              <div className="text-xl font-semibold text-[#1D1D1F]">Marketplace</div>
              <div className="text-[#1D1D1F] tracking-3">Manage your marketplace display and public information.</div>
            </div>   
            <div className="flex flex-col items-start gap-5 ">
                
                <FormField name="Name" placeholder="Maroc Food Service" />
                <FormField name="Location" placeholder="Rabat" />
               <FormField name="Categories" placeholder="Fresh products, Takeaway, Vegetable" />
             
            </div>
            <div className="w-full flex items-center justify-end gap-2 mb-10">
              <div className="px-3 py-2 text-center border-[0.5px] border-transparent hover:border-[#fc7348]/35 cursor-pointer  transition-all duration-300 text-[#1D1D1F]/80 hover:text-[#1D1D1F] tracking-tight text-[14px] rounded-lg">Discard</div>
              <div className="px-5 py-2 text-center bg-[#fc7348]/80 cursor-pointer hover:bg-[#fc7348]/90 transition-all duration-300 text-white tracking-tight text-[14px] rounded-lg">Save</div>

            </div>
          </div>
          </div>  
          <div className="flex flex-col items-start gap-6 py-2">
            <div className="text-xl font-semibold">Profile preview</div>
            <div className="  max-w-[273px] overflow-hidden  flex flex-col items-start gap-4 rounded-xl px-3 py-2 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
             <div className="flex items-center gap-2 ">
               <div className="w-[58px] h-[58px] rounded-full  shadow-[inset_0px_1px_1px_rgba(0,0,0,0.5),inset_0px_-1px_1px_rgba(0,0,0,0.5)] overflow-hidden">
                <img loading="lazy" src={'/resto2.jpg'} alt="User image" height={58} width={58} className="object-cover w-full h-full" />
               </div>
               <div className="flex flex-col items-start gap-1">
                  <div className="text-[#1D1D1F] tracking-3 font-medium">Maroc Food Service</div> 
                  <div className="text-[13px] px-1 bg-green-100 text-green-800 rounded-xl flex items-center gap-0.5"><CircleCheck size={14} strokeWidth={1} />Verified</div>
               </div>
                
             </div>
            
             <div className="flex flex-col items-start gap-1 w-full">
                <div className="text-[#1D1D1F]/70 text-[14px]">General:</div>
                  <div className="flex flex-col items-start gap-2 w-full">
                  <div className="w-full items-center flex justify-between">
                    <div className="flex items-center gap-1">
                        <Star size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                        <div className="text-[#1D1D1F]/70 text-[14px]">Reviews</div>
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
                    <div className="text-[#1D1D1F] text-[14px] font-medium">5 months</div>
                </div>
                <div className="w-full items-center flex justify-between">
                    <div className="flex items-center gap-1">
                        <Package size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                        <div className="text-[#1D1D1F]/70 text-[14px]">Min order</div>
                    </div>
                    <div className="text-[#1D1D1F] text-[14px] font-medium">1000DH</div>
                </div>

             </div>
             </div>
            <div className="flex flex-col items-start gap-2 w-full">
                <div className="text-[#1D1D1F]/70 text-[14px]">Specializations:</div>
                <div className="mask-alpha mask-l-from-[#fafafa] mask-l-from-90% mask-t-from-100% mask-b-from-99% mask-r-from-90% mask-r-from-[#fafafa]">
                 <div className="flex items-center gap-1 ">
                 <div className="px-2 py-0.5 text-xs text-[#1D1D1F]/70  shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)]  backdrop-blur-lg bg-gray-200/20 rounded-[6px] truncate">Fresh products</div>
                 <div className="px-2 py-0.5 text-xs text-[#1D1D1F]/70  shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)]  backdrop-blur-lg bg-gray-200/20 rounded-[6px] truncate">Takeaway</div>
                  <div className="px-2 py-0.5 text-xs text-[#1D1D1F]/70  shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)]  backdrop-blur-lg bg-gray-200/20 rounded-[6px] truncate">Vegetable</div>
                 

                 </div>
               </div>

            </div>
            <div className="w-full flex items-center gap-2">
                <div className="w-full px-3 py-2 text-center bg-[#fc7348]/80 cursor-pointer hover:bg-[#fc7348]/90 transition-all duration-300 text-white tracking-tight text-[14px] rounded-lg">See products</div>
            </div>
            </div>
          </div>
        </div>
         
         
        </>
    )
}