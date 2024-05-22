import React from 'react'
import { Image } from 'react-bootstrap'

const page = () => {
  return (
    <>
      <>
        <div className="uni-banner">
          <div className="container">
            <div className="uni-banner-text">
              <h1>About Us</h1>
              <ul>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
        {/* End Banner Area */}
        {/* Start About Area */}
        <div className="about inner-about pb-100 bg-f9fbfe">
          <div className="about-content">
            <div className="container">
              <div className="row ">
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="about-img">
                    <Image src="assets/images/about/about-us.png" alt="image" />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="about-text-area">
                    <div className="default-section-heading">
                      <h6>About Us</h6>
                      <h3>
                        Our goal is to help student identify the need to education
                      </h3>
                    </div>
                    <p>
                      Welcome to Shikhsha-Pradata, your premier destination for connecting with top-quality tutors tailored to meet your 
                      unique learning needs. Our platform is dedicated to bridging the gap between students and experienced tutors, 
                      ensuring that every learner has access to the best educational support available. At Shikhsha-Pradata, 
                      we understand the importance of personalized learning experiences, which is why we offer a seamless booking system 
                      that allows you to find and schedule sessions with the perfect tutor for you. Tutors on our platform have the 
                      flexibility to accept or reject booking requests, ensuring a mutual match that fosters productive and engaging 
                      learning environments. Whether you need help with academic subjects, test preparation, or skill development, 
                      Shikhsha-Pradata is here to empower your educational journey with expert guidance and support. Join us today and 
                      take the next step towards achieving your learning goals!
                    </p>
                    <div className="about-card">
                      <i className="flaticon-mission" />
                      <h4>Our Mission</h4>
                      <p>
                      Our mission is to connect students with expert tutors, providing personalized and effective educational support to 
                      help learners achieve their academic goals.
                      </p>
                    </div>
                    <div className="about-card">
                      <i className="flaticon-eye" />
                      <h4>Our Vision</h4>
                      <p>
                      Our vision is to be the premier platform for tutor-student connections, fostering educational excellence and 
                      empowering students to reach their full potential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    </>
  )
}

export default page
