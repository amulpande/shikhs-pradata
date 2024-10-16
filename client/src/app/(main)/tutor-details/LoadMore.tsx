'use client'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { fetchTutorData } from '@lib/utils/action';
import TutorCard from './TutorCard';
import { FeedbackMainPageType, TutorType } from '@lib/types/types';

const LoadMore = ({ subjects, order_by,rating,next }: { subjects: string, order_by: string,rating:FeedbackMainPageType[] ,next:string },) => {
    const [page, setPage] = useState(2)
    const { ref, inView } = useInView()
    const [tutor, setTutor] = useState<TutorType[]>([])
    const [nextUrl,setNextUrl] = useState<string|null>(next)
    useEffect(() => {
        // reseting data if subjects and order_by are changed
        setTutor([]);
        setPage(2);
    }, [subjects, order_by]);

    useEffect(() => {
        // if cursor hit the ref div than inview will be true and if nextUrl is there than this fetchdata will be called
        if (inView && nextUrl) {
            const fetchData = async () => {
                try {
                    const response = await fetchTutorData({ page: page, search: subjects, order_by: order_by });
                    setTutor([...tutor, ...response.results]);
                    setPage((p) => p += 1)
                    setNextUrl(response.next)
                } catch (error) {
                    console.error('Error fetching tutor data:', error);
                }
            };

            fetchData();
        }
    }, [inView, tutor, page, subjects, order_by,next,nextUrl])


    // tutors average rating will be sent
    const getTutorAverageRating = (tutorId: number) => {
        const tutorRatings = rating.filter((item:any) => item.tutor_id === tutorId && !isNaN(parseFloat(item.star)));
        if (tutorRatings.length === 0) {
            return 'No rating available';
        }
        const totalRating = tutorRatings.reduce((acc, curr:any) => acc + parseFloat(curr.star), 0);
        const averageRating = totalRating / tutorRatings.length;
        return averageRating.toFixed(2);
    };
    return (
        <>

            <div style={{ margin: 30, marginLeft: 50, padding: 10, display: 'flex', flexWrap: 'wrap' }}>
                {
                    tutor?.map((tutor, index) => (
                        <TutorCard index={index} tutor={tutor} key={index} rating={getTutorAverageRating(tutor?.id)} />
                    ))
                }
            </div>

            <div style={{ margin: 30, marginLeft: 50 }}>

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
