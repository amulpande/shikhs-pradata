import FooterHome from "@/components/HomeComponents/Footer/FooterHome";
import HeaderHome from "@/components/HomeComponents/Header/HeaderHome";
import TopBarHome from "@/components/HomeComponents/TopBar/TopBarHome";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {

// };
export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            
            <TopBarHome />
            <HeaderHome />
            {children}
            <FooterHome />
        </>
    );
}
