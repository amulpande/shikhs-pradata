'use client'
import React from 'react'
import Loaderdata from '../../loadin-screeen.json'
import Lottie from 'lottie-react'
const LoadingComponent = () => {
    return (
        <>
            <Lottie loop={true} animationData={Loaderdata} />
        </>
    )
}

export default LoadingComponent
