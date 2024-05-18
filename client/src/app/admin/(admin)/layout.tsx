import SideNavBarAdmin from "@/components/AdminComponents/Side-Nav/SideNavBarAdmin";

import { Inter } from "next/font/google";
// import "./globals.css";
import "./admincss.css"
import AdminHeader from "@/components/AdminComponents/Header/AdminHeader";
import FooterHome from "@/components/HomeComponents/Footer/FooterHome";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {

// };
export default function AdminMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AdminHeader />
            <SideNavBarAdmin />
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-10">
                    <div className="">

                        {children}
                    </div>
                </div>
            </div>
            {/* <FooterHome /> */}
            {/* <FooterHome/> */}
        </>
    );
}