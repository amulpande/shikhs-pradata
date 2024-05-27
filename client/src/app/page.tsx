import FooterHome from "@/components/HomeComponents/Footer/FooterHome";
import HeaderHome from "@/components/HomeComponents/Header/HeaderHome";
import TopBarHome from "@/components/HomeComponents/TopBar/TopBarHome";
import MainBannerComponent from "./(main)/index/MainBannerComponent";
import FeatureComponent from "./(main)/index/FeatureComponent";
import WhyChooseUsComponent from "./(main)/index/WhyChooseUsComponent";
import WhatPeopleSayComponent from "./(main)/index/WhatPeopleSayComponent";

export default function Home() {

  return (
    <>
    <TopBarHome/>
     <HeaderHome/>
     <MainBannerComponent/>
     <FeatureComponent/>
     <WhyChooseUsComponent/>
     <WhatPeopleSayComponent/>
    <FooterHome/>
    </>

  );
}
