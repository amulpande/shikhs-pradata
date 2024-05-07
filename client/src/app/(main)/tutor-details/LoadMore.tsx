'use client'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { fetchTutorData } from '@lib/utils/action';

let page = 2

const LoadMore = () => {
    const { ref, inView } = useInView()
    const [tutor, setTutor] = useState<any[]>([])
    useEffect(() => {
        if (inView) {
            // alert('You have reached bottom')
            // const data = fetchTutorData({page:page,search:''})
            // console.log('readmore ----> ',data)
            // // setTutor(data.results)
            // page = page + 1
            const fetchData = async () => {
                try {
                    const response = await fetchTutorData({ page: page, search: '' });
                    console.log('data', response.results);
                    setTutor([...response.results]); // Assuming response is the array of tutors
                } catch (error) {
                    console.error('Error fetching tutor data:', error);
                }
            };
            fetchData();
        }
    }, [inView])
    return (
        <>

            <div style={{ margin: 30, padding: 10, display: 'flex', flexWrap: 'wrap' }}>
                {/* {status == 'succeeded' ? */}
                {

                    tutor?.map((tutor, index) => (

                        <Card sx={{ maxWidth: 322, margin: '15px' }} key={index}>
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
                    ))}
                {/* // : <LinearProgress color="secondary" />} */}
                {/* : <LinearProgress color="secondary" />} */}

            </div>
            {/* <section className="flex justify-center items-center w-full">
                
            </section> */}
            <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    src="./spinner.svg"
                    alt="spinner"
                    width={56}
                    height={56}
                    className="object-contain"
                />
            </div>
        </>
    )
}

export default LoadMore
