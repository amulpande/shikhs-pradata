'use client'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { fetchTutorData } from '@lib/utils/action';
import TutorCard from './TutorCard';

// let page = 2

const LoadMore = () => {
    const [page,setPage] = useState(2)
    const { ref, inView } = useInView()
    const [tutor, setTutor] = useState<any[]>([])
    useEffect(() => {
        if (inView) {
            // page = page
            const fetchData = async () => {
                try {
                    // console.log('page number ',page)
                    const response = await fetchTutorData({ page: page, search: '' });
                    // page += 1
                    console.log('data from load more ->  ', response.results);
                    setTutor([...tutor,...response.results]); // this will store new data with old data and continue to display in client side
                    setPage((p)=>p+=1)
                } catch (error) {
                    console.error('Error fetching tutor data:', error);
                }
            };
            fetchData();

            // return (
            //     page = 2
            // )

        }
    }, [inView,tutor,page])
    return (
        <>
            <div style={{ margin: 30, marginLeft: 50, padding: 10, display: 'flex', flexWrap: 'wrap' }}>
                {
                    tutor?.map((tutor, index) => (
                        <TutorCard index={index} tutor={tutor} key={index} />
                    ))
                }
            </div>
            <div style={{ margin: 30, marginLeft: 50}}>


                <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src="./spinner.svg"
                        alt="spinner"
                        width={56}
                        height={56}
                        className="object-contain"
                    />
                </div>
            </div>
        </>
    )
}

export default LoadMore
