import React from 'react'
import styles from './Payment.module.scss'
import Link from 'next/link'

const page = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles['printer-top']}></div>

                <div className={styles['paper-container']}>
                    <div className={styles['printer-bottom']}></div>

                    <div className={styles.paper}>
                        <div className={styles['main-contents']}>
                            <div className={styles['success-icon']}>&#10004;</div>
                            <div className={styles['success-title']}>
                                Payment Complete
                            </div>
                            <div className={styles['success-description']}>
                                Thank you for completing the payment!
                            </div>
                        </div>
                        <div className={styles['jagged-edge']}></div>
                    </div>
                </div>
                <center>
                    <Link href='/my-booking'>
                        <button className='btn btn-success btn-lg'>Back To Website</button>
                    </Link>
                </center>
            </div>
        </>
    )
}

export default page
