'use client'
import { getFeedbackForMainPage } from '@lib/api/allApi'
import { FeedbackMainPageType } from '@lib/types/types'
import { Rating } from '@mui/material'
import { CldImage } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { Carousel, Container, Row, Col } from 'react-bootstrap'

const WhatPeopleSayComponent = () => {
    const [userFeedbacks, setUserFeedbacks] = useState<FeedbackMainPageType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchReview = async () => {
            setLoading(true)
            try {
                const response = await getFeedbackForMainPage()
                setUserFeedbacks(response.data)
            } catch (error) {
                console.error('Error fetching feedback ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchReview()
    }, [])
    return (
        <div className="testimonial ptb-50">
            <Container>
                <Row className="align-items-center">
                    <Col lg={5}>
                        <div className="testimonial-text-area">
                            <div className="default-section-heading">
                                <h6>OUR CUSTOMER</h6>
                                <h3>What People Say About Us</h3>
                            </div>
                            {loading ? <p>Loading...</p> :

                                <div className="testimonial-card-area">

                                    <Carousel  data-bs-theme="dark">
                                        {userFeedbacks?.map((feedback, index) => (
                                            <Carousel.Item key={index}>
                                                <div className="testimonial-card">
                                                    <div className="stars">
                                                        <ul>
                                                            <Rating
                                                                name="text-feedback"
                                                                value={feedback?.star}
                                                                readOnly
                                                                precision={0.5}
                                                                // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                            />
                                                        </ul>
                                                    </div>
                                                    <p>{feedback.review}</p>
                                                    <div className="testimonial-intro">
                                                        <CldImage src={feedback?.user_profile || ''} alt="User Profile" width={300} height={300}  />
                                                        <div className="testimonial-intro-text">
                                                            <h4>{feedback?.user_name}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>

                                </div>
                            }
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className="testimonial-img-area">
                            <div className="testimonial-img">
                                <Image src="/assets/images/banner/apple-7687261_1280.jpg" alt="Comment Section" fluid />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default WhatPeopleSayComponent
