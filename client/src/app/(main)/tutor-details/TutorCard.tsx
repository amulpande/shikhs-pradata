'use client'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; import Link from 'next/link';
import { MotionDiv } from './MotionDiv';
import { TutorType } from '@lib/types/types';
import { Rating } from '@mui/material';
;

const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}
interface TutorCardProps {
    tutor: TutorType;
    index: any;
    rating: any
}


const TutorCard: React.FC<TutorCardProps> = ({ tutor, index, rating }) => {
    const [hover, setHover] = useState(false);
    return (
        <MotionDiv
            initial="hidden"
            animate="visible"
            variants={variant}
            transition={{
                // delay:1,
                delay: index * 0.25,
                ease: 'easeInOut',
                duration: 0.5
            }}
            viewport={{
                amount: 0
            }}
        >

            <Card sx={{ maxWidth: 322, margin: '50px', boxShadow: 20 }} key={index}>
                <CardMedia
                    sx={{ height: 220 }}

                    image={tutor.profile_image}
                    title="green iguana"
                />
                <CardContent sx={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            {tutor.first_name + ' ' + tutor.last_name}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
                            <i className='fa fa-book'></i> {tutor?.subjects_name}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', marginRight: '5px' }}>
                                <i className="fas fa-clock"></i> {tutor?.experience} Year
                            </Typography>
                            {" "}
                            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                <i className="fas fa-rupee-sign"></i> {tutor?.price}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        {tutor?.short_bio.slice(0, 100)}...
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        {rating}...
                    </Typography> */}
                    <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                </CardContent>
                <CardActions sx={{
                    alignSelf: "stretch",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center", // Aligning to center vertically
                    // 👇 Edit padding to further adjust position
                    p: -5,
                }}>
                    {/* <Link href={`/tutor-details/${tutor.id}`}>
                        <Button size="small" variant="contained" color="primary">
                            Learn More
                        </Button>
                    </Link> */}
                    <Link href={`/tutor-details/${tutor.id}`} passHref>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            style={{
                                // background: hover ? 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                background: hover ? '#1E88E5' : '#1976D2',
                                border: 0,
                                borderRadius: 3,
                                // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
                                color: 'white',
                                height: 48,
                                padding: '0 30px',
                                textTransform: 'uppercase',
                                transition: 'background 0.3s ease-in-out, transform 0.2s ease',
                                transform: hover ? 'scale(1.05)' : 'scale(1)',
                                animation: !hover ? 'pulse 2s infinite' : 'none'
                            }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            Learn More
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </MotionDiv>

    )
}

export default TutorCard
