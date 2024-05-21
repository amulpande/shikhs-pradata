'use client'
import React from 'react'
import Loaderdata from '../../loadin-screeen.json'
import styles from './LoadingComponent.module.css'
import Lottie from 'lottie-react'

const AdminLoading = () => {
    return (
        <>
            <div className={styles.lottieWrapper}>
                <Lottie loop={true} animationData={Loaderdata} />
            </div>
        </>
    )
}

export default AdminLoading
