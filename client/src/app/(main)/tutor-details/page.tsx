'use client'
import React, { useCallback, useEffect, useState } from 'react'
import LoadMore from './LoadMore';
import { fetchTutorData } from '@lib/utils/action';
import TutorCard from './TutorCard';
import { useSelector } from 'react-redux';
import { getSubjectsApi, ratingTutorApi } from '@lib/api/allApi';
import { Form } from 'react-bootstrap';
import { SubjectTypes } from '@lib/types/types';


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
    const[rating,setRating] = useState<any[]>([])

    const fetchTutors = useCallback(async () => {
        const tutors = await fetchTutorData({ page: 1, search: searchQuery });
        // console.log('tutors ',tutor)
        setTutorData(tutors);
    }, [searchQuery])

    useEffect(() => {
        const fetchSubjects = async () => {

            try {
                const response = await getSubjectsApi()
                setSubject(response.data)
            } catch (error) {
                console.error("Error fetchig subject", error)
            }
        }
        const fetchRating = async () => {
            try {
                const response = await ratingTutorApi()
                setRating(response.data)
                console.log('response star', response)
            } catch (error) {
                
            }
        }
        fetchTutors();
        fetchSubjects()
        fetchRating()
    }, [fetchTutors]); // Trigger fetchTutors whenever searchQuery changes

    const handleSelectSubject = (e) => {
        setSearchQuery(e.target.value);
        
    }
    const getTutorRating = (tutorId) => {
        const tutorRating = rating.find((item) => item.tutor_id === tutorId);
        return tutorRating ? tutorRating.rating : null;
    };
    // console.log('subjecttctcsdsdsd', subjects)
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
            <div className='card-header mt-2'>

                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" onChange={handleSelectSubject} value={searchQuery}>
                            <option value={''}>filter subject</option>
                            {subjects?.map((subject,index)=>(

                            <option key={index} value={subject?.subject_name}>{subject?.subject_name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
            </div>
            <div style={{ margin: 30, marginLeft: 50, padding: 10, display: 'flex', flexWrap: 'wrap' }}>
                {
                    tutor.results?.map((tutor: any, index: any) => (
                        <TutorCard tutor={tutor} index={index} key={index}/>
                        
                    ))
                }
            </div>
            {/* {tutor && tutor.next && <LoadMore subjects={searchQuery}/>} */}
             {tutor ? (tutor?.results?.length > 0 ? (tutor.next && <LoadMore subjects={searchQuery} />) : <h3 className='text-center'>No data found</h3>) : null}
            

        </>
    )
}

export default TutorDetailsPage
