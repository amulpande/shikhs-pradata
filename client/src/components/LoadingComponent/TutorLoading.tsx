'use client'
import React from 'react'
import Loaderdata from '../../tutor-loader.json'
import styles from './LoadingComponent.module.css'
import Lottie from 'lottie-react'

const TutorLoading = () => {
    return (
        <>
            <div className={styles.lottieWrapper}>
                <Lottie loop={true} animationData={Loaderdata} />
            </div>
        </>
    )
}

export default TutorLoading
