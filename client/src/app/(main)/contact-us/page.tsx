'use client'
import { postContactUsApi } from '@lib/api/allApi'
import { customErrorMessageErrorNotify, customSuccessMessageErrorNotify } from '@lib/notification-toastify/notification-toastify'
import { ContactUsType } from '@lib/types/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainContactUsPage = () => {
    const [contactUs, setContactUs] = useState<ContactUsType>({
        'name': '',
        'email': '',
        'contact': '',
        'subject': '',
        'message': ''
    })
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        const isValid = contactUs.name !== '' && contactUs.email !== '' && contactUs.contact !== '' && contactUs.subject !== '' && contactUs.message !== '';
        setIsFormValid(isValid);
    }, [contactUs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactUs({ ...contactUs, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>Contact Us</h1>
                        <ul>
                            <li>
                                <Link href="/index">Home</Link>
                            </li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* End Banner Area */}
            {/* Start Contact Area */}
            <div className="contact-area ptb-100">
                <div className="container">
                    <div className="default-section-heading default-section-heading-middle">
                        <h6>Send Message</h6>
                        <h3>We Are Here To Help You</h3>
                    </div>
                    <div className="section-content">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div className="contact-card">
                                            <i className="fas fa-map-marker-alt" />
                                            <h4>Our Location</h4>
                                            <p>Vapi, Gujrat, India</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                                        <div className="contact-card">
                                            <i className="fas fa-envelope" />
                                            <h4>Email</h4>
                                            <p>
                                                <a href="mailto:pande.amul.dcs24@vnsgu.ac.in">
                                                    Click Me
                                                </a>
                                            </p>

                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                                        <div className="contact-card">
                                            <i className="fas fa-phone-alt" />
                                            <h4>Phone</h4>
                                            <p>
                                                <a href="tel:9988776655">9988776655</a>
                                            </p>
                                            <p>
                                                <a href="tel:9988776655">9988776655</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="contact-form-area">
                                    <form
                                        className="contact__form"
                                        onSubmit={async (e) => {
                                            e.preventDefault()
                                            try {
                                                const response = await postContactUsApi(contactUs)
                                                if (response.status === 201) {
                                                    customSuccessMessageErrorNotify('We will contact you soon')
                                                    setContactUs({
                                                        'name': '',
                                                        'email': '',
                                                        'contact': '',
                                                        'subject': '',
                                                        'message': ''
                                                    })
                                                }

                                            } catch (error) {
                                                console.error('Something went wrong in contact', error)
                                                customErrorMessageErrorNotify('Something went wrong try again later')
                                            }
                                        }}
                                    >
                                        {/* form message */}
                                        <div className="row">
                                            <div className="col-12">
                                                <div
                                                    className="alert alert-success contact__msg"
                                                    style={{ display: "none" }}
                                                    role="alert"
                                                >
                                                    Your message was sent successfully.
                                                </div>
                                            </div>
                                        </div>
                                        {/* end message */}
                                        {/* form element */}
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6 col-12">
                                                <input
                                                    name='name'
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name*"
                                                    value={contactUs.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-12">
                                                <input
                                                    name='email'
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email*"
                                                    value={contactUs.email}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-12">
                                                <input
                                                    name='contact'
                                                    value={contactUs.contact}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Phone*"
                                                    onChange={handleChange}

                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-12">
                                                <input
                                                    name='subject'
                                                    value={contactUs.subject}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Subject*"
                                                    onChange={handleChange}

                                                />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <textarea
                                                    name='message'
                                                    value={contactUs.message}
                                                    rows={5}
                                                    className="form-control"
                                                    placeholder="Message*"

                                                    defaultValue={""}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <Button
                                                    variant='contained'
                                                    // color=''
                                                    className='btn btn-warning'
                                                    type="submit"
                                                    disabled={!isFormValid}

                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </div>
                                        {/* end form element */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />


        </>
    )
}

export default MainContactUsPage
