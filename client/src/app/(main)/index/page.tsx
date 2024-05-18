import FeatureComponent from './FeatureComponent';
import MainBannerComponent from './MainBannerComponent';
import WhatPeopleSayComponent from './WhatPeopleSayComponent';
import WhyChooseUsComponent from './WhyChooseUsComponent';
const IndexPage = () => {
  return (
    <>
      <MainBannerComponent/>
      <FeatureComponent/>
      <WhyChooseUsComponent/>
      <WhatPeopleSayComponent/>
    </>

  );
};

export default IndexPage;
