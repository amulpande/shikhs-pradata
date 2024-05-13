import React, { useEffect, useState } from 'react'
import LoadMore from './LoadMore';
import { fetchTutorData } from '@lib/utils/action';
import TutorCard from './TutorCard';


const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}
const TutorDetailsPage = async () => {
    const tutor = await fetchTutorData({ page: 1, search: '' })
    return (
        <>
            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>Tutor Details</h1>
                        <ul>
                            <li>
                                <a href="index.php">HOME</a>
                            </li>
                            <li>SERVICE DETAILS</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ margin: 30, marginLeft: 50, padding: 10, display: 'flex', flexWrap: 'wrap' }}>
                {
                    tutor.results?.map((tutor, index) => (
                        <TutorCard tutor={tutor} index={index} key={index} />
                    ))
                }
            </div>
            <LoadMore />

        </>
    )
}

export default TutorDetailsPage
