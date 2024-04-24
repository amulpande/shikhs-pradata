import React from 'react'
import FooterHome from '@/components/HomeComponents/Footer/FooterHome'
import HeaderHome from '@/components/HomeComponents/Header/HeaderHome'
import TopBarHome from '@/components/HomeComponents/TopBar/TopBarHome'
const layout = ({children}: Readonly<{children: React.ReactNode;}>) => {
    return (
        <div>
            <TopBarHome />
            <HeaderHome />
            <FooterHome />
        </div>
    )
}

export default layout
