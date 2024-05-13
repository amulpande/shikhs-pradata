'use client'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; import Link from 'next/link';
import { MotionDiv } from './MotionDiv';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@lib/store/store';
import { TutorType } from '@lib/types/types';
;

const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}
interface TutorCardProps {
    tutor: TutorType;
    index: any;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor, index }) => {
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
                    sx={{ height: 140 }}
                    image={tutor.profile_image}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {tutor.first_name + ' ' + tutor.last_name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {tutor?.subjects_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {tutor?.short_bio.slice(0, 100)}...
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    alignSelf: "stretch",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center", // Aligning to center vertically
                    // 👇 Edit padding to further adjust position
                    p: -5,
                }}>
                    <Link href={`/tutor-details/${tutor.id}`}>
                        <Button size="small" variant="contained" color="primary">
                            Learn More
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </MotionDiv>

    )
}

export default TutorCard
