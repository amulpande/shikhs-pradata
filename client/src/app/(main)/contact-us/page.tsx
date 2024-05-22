import React from 'react'
const MainContactUsPage = () => {
    return (
        <>

            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>Contact Us</h1>
                        <ul>
                            <li>
                                <a href="index.html">Home</a>
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
                                                    pande.amul.dcs24@vnsgu.ac.in
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
                                        method="post"
                                        action="https://excellencetheme.com/templates/azar/assets/php/mail.php"
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
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name*"

                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-12">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email*"

                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-12">
                                                <input
                                                    name="phone"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Phone*"

                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-12">
                                                <input
                                                    name="subject"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Subject*"

                                                />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <textarea
                                                    name="message"
                                                    rows={5}
                                                    className="form-control"
                                                    placeholder="Message*"

                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-12">
                                                <input
                                                    name="submit"
                                                    type="submit"
                                                    className="default-button default-button-2 btn-success"
                                                    defaultValue="Send Message"
                                                />
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


        </>
    )
}

export default MainContactUsPage
