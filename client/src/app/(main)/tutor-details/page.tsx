'use client'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAllApprovedTutor } from '../../../../lib/api/allApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RooState } from '../../../../lib/store/store';
import { tutorApi } from '../../../../lib/store/thunk-api/tutor-api';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CircularProgress, LinearProgress } from '@mui/material';

const TutorDetailsPage = () => {
    const [tutorData, setTutorData] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>()
    const { tutor, status, error } = useSelector((state: RooState) => state.tutorData)
    const router = useRouter()
    useEffect(() => {
        // dispatch()
        dispatch(tutorApi())
    }, [dispatch])
    console.log('hello', tutor)
    return (
        <>
            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>Service Details</h1>
                        <ul>
                            <li>
                                <a href="index.php">HOME</a>
                            </li>
                            <li>SERVICE DETAILS</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ margin: 30, padding: 10, display: 'flex' }}>
                {status == 'succeeded' ?

                    tutor?.map((tutor, index) => (

                        <Card sx={{ maxWidth: 345, margin: '15px' }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={tutor.profile_image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {tutor.first_name + ' ' + tutor.last_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={`/tutor-details/${tutor.id}`}>

                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))
                    : <LinearProgress color="secondary" />}
            </div>
        </>
    )
}

export default TutorDetailsPage
