// 'use client'
import { Inter } from "next/font/google";
// import "./globals.css";
import "./tutorcss.css"
import Loader from '../../../loadin-screeen.json'
import Lottie from 'lottie-react'
import NavBarPartnerComponent from "@/components/PartnerComponent/NavBar/NavBarPartnerComponent";
import SideBarPartner from "@/components/PartnerComponent/SideBar/SideBarPartnerComponent";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {

// };
export default function PartnerMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        
            <NavBarPartnerComponent />

            <SideBarPartner/>
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-10">
                    <div className="">

                        {children}
                    </div>
                </div>
            </div>


        </>
    );
}