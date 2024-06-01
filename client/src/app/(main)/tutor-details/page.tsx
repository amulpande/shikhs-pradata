'use client'
import React, { useCallback, useEffect, useState } from 'react'
import LoadMore from './LoadMore';
import { fetchTutorData } from '@lib/utils/action';
import TutorCard from './TutorCard';
import { useSelector } from 'react-redux';
import { getSubjectsApi, ratingTutorApi } from '@lib/api/allApi';
import { Form } from 'react-bootstrap';
import { SubjectTypes } from '@lib/types/types';
import { CircularProgress } from '@mui/material';


const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}
const TutorDetailsPage = () => {
    // const [searching,setSearching] = useState('')
    // const tutor = await fetchTutorData({ page: 1, search: '' })
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [subjects, setSubject] = useState<SubjectTypes[]>([])
    const [tutor, setTutorData] = useState<any>([]);
    const [rating, setRating] = useState<any[]>([])
    const [orderBy, setOrderBy] = useState<string>('-id')
    const [next,setNext] = useState<string>('')

    const fetchTutors = useCallback(async () => {
        const tutors = await fetchTutorData({ page: 1, search: searchQuery, order_by: orderBy });
        setTutorData(tutors);
        setNext(tutors.next)
        console.log('teachre details ',tutors)
    }, [searchQuery, orderBy])

    useEffect(() => {
        fetchTutors()
    }, [fetchTutors]); // Trigger fetchTutors whenever searchQuery changes
    useEffect(() => {
        const fetchSubjects = async () => {

            try {
                const response = await getSubjectsApi()
                setSubject(response.data)
                
            } catch (error) {
                console.error("Error fetchig subject", error)
            }
        }
        fetchSubjects()
    }, [])
    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await ratingTutorApi()
                setRating(response.data)
            } catch (error) {

            }
        }
        fetchRating()
    }, [])

    const handleSelectSubject = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSearchQuery(e.target.value);
    }
    const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(e.target.value)
    }
    const getTutorAverageRating = (tutorId: number) => {
        const tutorRatings = rating.filter((item) => item.tutor_id === tutorId && !isNaN(parseFloat(item.star)));
        if (tutorRatings.length === 0) {
            return 'No rating available';
        }
        const totalRating = tutorRatings.reduce((acc, curr) => acc + parseFloat(curr.star), 0);
        const averageRating = totalRating / tutorRatings.length;
        return averageRating.toFixed(2); // rounding to 2 decimal places
    };

    return (
        <>
            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>Tutor Details</h1>
                        <ul>
                            <li>
                                <a href="/index">HOME</a>
                            </li>
                            <li>TUTOR DETAILS</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='card-header mt-2'>
                <div className="d-flex justify-content-end mt-2">
                    <select className="form-select me-2" onChange={handleSelectSubject} value={searchQuery} style={{ maxWidth: '200px' }}>
                        <option value={''}>Filter Subject</option>
                        {subjects?.map((subject, index) => (
                            <option key={index} value={subject?.subject_name}>{subject?.subject_name}</option>
                        ))}
                    </select>

                    <select className="form-select" onChange={handleOrderByChange} value={orderBy} style={{ maxWidth: '200px' }}>
                        <option value={'-id'}>Sort</option>
                        <option value={'first_name'}>First Name</option>
                        <option value={'price'}>Price</option>
                        <option value={'-experience'}>Experience</option>
                    </select>
                </div>
            </div>
            <div style={{ margin: 30, marginLeft: 50, padding: 10, display: 'flex', flexWrap: 'wrap' }}>
                {
                    tutor.results?.map((tutor: any, index: any) => (
                        <TutorCard tutor={tutor} index={index} key={index} rating={getTutorAverageRating(tutor?.id)} />
                    ))
                }
            </div>
            {tutor ? (tutor?.results?.length > 0 ? (tutor.next && <LoadMore subjects={searchQuery} order_by={orderBy} rating={rating} next={tutor.next}/>)
                : <h3 className='text-center'><CircularProgress /></h3>) : 'NO DATA FOUND...'}
        </>
    )
}

export default TutorDetailsPage
