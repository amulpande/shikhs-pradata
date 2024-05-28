import React from 'react';
import styles from './PaymentFailPage.module.scss';
import Link from 'next/link';

const PaymentFailPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles['printer-top']}></div>

            <div className={styles['paper-container']}>
                <div className={styles['printer-bottom']}></div>

                <div className={styles.paper}>
                    <div className={styles['main-contents']}>
                        <div className={styles['fail-icon']}>&#10060;</div>
                        <div className={styles['fail-title']}>
                            Payment Failed
                        </div>
                        <div className={styles['fail-description']}>
                            Oops! Something went wrong with your payment. Please try again later.
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
    );
};

export default PaymentFailPage;
