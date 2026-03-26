import { Outlet } from "react-router";
import SuplierSideBar from "./suplierSB";


export default function Layout() {
    return(
        <div className="layoutSP w-full h-screen flex items-start gap-3  overflow-y-hidden relative  px-3 pt-2 ">
            <SuplierSideBar />
            <Outlet />
        </div>
    )
}