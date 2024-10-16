'use client'
import React from 'react'
import Loaderdata from '../../loadin-screeen.json'
import LoadingData from '../../loadind-screen-plane.json'
import styles from './LoadingComponent.module.css'
import Lottie from 'lottie-react'
const LoadingComponent = () => {
    return (
        <>
            <div className={styles.lottieWrapper}>
                <Lottie loop={true} animationData={LoadingData} />
            </div>
        </>
    )
}

export default LoadingComponent
