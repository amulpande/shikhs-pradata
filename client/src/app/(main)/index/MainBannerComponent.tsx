import Link from 'next/link'
import React from 'react'
import { Image } from 'react-bootstrap';
import { MotionDiv } from '../tutor-details/MotionDiv';
const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}
const MainBannerComponent = () => {
    return (
        <div className="main-banner bg-f9fbfe">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="banner-text-area">
                            <h1>Need Tutor to help you study? </h1>
                            <p className='text-white'> We provide best Tutor for you </p>
                            <Link className="default-button" href="/tutor-details">Our Tutor</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner-img">
                            {/* <MotionDiv
                                initial="hidden"
                                animate="visible"
                                variants={variant}
                                transition={{
                                    // delay:1,
                                    delay: 0.5,
                                    ease: 'easeInOut',
                                    duration: 0.5
                                }}
                                viewport={{
                                    amount: 0
                                }}
                            > */}
                                <Image src="assets/images/banner/tutor-png.png" alt="image" />
                            {/* </MotionDiv> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainBannerComponent
