import { Search } from "lucide-react";

export default function SearchBar({placeholder}: {placeholder?: string}) {

    return(
        <>
         <div className="flex-1 relative  rounded-xl bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
             type="text"
             placeholder={placeholder ? placeholder :`Search by customer,order,products... `}
             className="w-full pl-10 pr-4 py-2  rounded-lg outline-0 focus:border-transparent"
            />
            </div>
                       
        </>
    )
}