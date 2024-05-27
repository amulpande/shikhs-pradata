import React from 'react'
import { Image } from 'react-bootstrap'

const WhyChooseUsComponent = () => {
    return (
        <div className="why-we pb-100 bg-f9fbfe">
            <div className="why-we-content">
                <div className="container">
                    <div className="row ">
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="why-we-img">
                                <Image src="assets/images/about/about-us.png" alt="image" />
                            </div>
                        </div>
                        <br />
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="why-we-text-area">
                                <div className="default-section-heading">
                                    <h6>WHY CHOOSE US</h6>
                                    <h3>We Provide you best teacher possible</h3>
                                </div>
                                <div className="why-we-card">
                                    <i className="flaticon-circuit" />
                                    <h4>Fast service</h4>
                                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed elite eiusmod incididunt magna dolore magna.</p> */}
                                </div>
                                <div className="why-we-card">
                                    <i className="flaticon-plug" />
                                    <h4>Affordable Price</h4>
                                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed elite eiusmod incididunt magna dolore magna.</p> */}
                                </div>
                                <div className="why-we-card">
                                    <i className="flaticon-signal" />
                                    <h4>Quality of Work</h4>
                                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed elite eiusmod incididunt magna dolore magna.</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default WhyChooseUsComponent
