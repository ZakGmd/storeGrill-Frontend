import { Pen } from "lucide-react";

interface FormField {
 name: string;
 placeholder?: string;

}

export default function FormField({name , placeholder}:FormField){
 
    return(
        <>
          <div className="flex h-12 py-1  px-1 pl-5 justify-center bg-[#FAFAFA] items-center gap-5 self-stretch shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-xl">
            <div className="text-base font-normal leading-6 tracking-tight-3 w-25 text-[#1D1D1F]">{name}</div>
            <div className="h-4 w-[1px] bg-black/20"></div>
            <div className="p-1 flex-1 w-60 flex items-center gap-1">
             <input type="text" placeholder={placeholder ? placeholder : "hey"} className="flex py-1 w-full  rounded-[4px] text-[14px] text-start ring-0 outline-0"></input>
            </div>
            <div className="flex h-10 px-3 py-2.5 justify-center bg-gray-200/30 group transition-all duration-200 cursor-pointer hover:shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] items-center gap-1.5 rounded-xl">
                        <Pen strokeWidth={1} size={16} className="text-[#1D1D1F]/70 group-hover:text-[#1D1D1F]/85 transition-all duration-200" />
                        <div className="text-sm font-normal  text-[#1D1D1F]/70 group-hover:text-[#1D1D1F]/85 transition-all duration-200">Edit</div>
            </div>
         </div>
        </>
    )
}