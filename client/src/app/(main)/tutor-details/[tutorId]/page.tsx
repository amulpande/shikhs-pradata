'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTutorById } from '../../../../../lib/slices/tutor-slice/tutor-slice'
import { RooState } from '../../../../../lib/store/store'
import { CardMedia } from '@mui/material'
import { tutorApi } from '../../../../../lib/store/thunk-api/tutor-api'
// import { makeStyles } from '@mui/styles';


const TutorDetailsByIdPage = ({ params }) => {
  // const classes = useStyles();
  const data = useSelector((state): RooState => selectTutorById(state, params.tutorId))
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(tutorApi())
  },[])
  console.log('tutor profile', data)
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
 
        <div className="service-details pt-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="service-details-text-area">
                  <div className="title">
                    <h2>{/*?php echo $row[1]; ?*/}</h2>
                  </div>
                  <CardMedia
                            sx={{ height: 140, width:140 }}
                            image={data?.profile_image}
                            title="green iguana"
                        />
                  {/* <div class="title">
                          <h2></h2>
                      </div> */}
                  <div className="title">
                    {/* <h4>Rs.<?php echo $row['4']; ?>.00</h4> */}
                    <h4>Teaching Charges perhour</h4>
                    <span> ₹ {data?.price}</span>
                    <span className="star-style">*</span>
                  </div>
                  <div>
                    <p>{/*?php echo $row['2'];?*/}</p>
                  </div>{" "}
                  <br />
                  <form method="post" name="booking">
                    <input
                      type="submit"
                      id="bookMyService"
                      name="book"
                      defaultValue="Book Now"
                      className=" effect btn-md btn btn-dark effect  form-control"
                    />
                  </form>
                  <hr />

                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <div className="details-page-sidebar pl-20 pt-30">
                  <div className="sidebar">

                  </div>
       
                  <div className="sidebar-section opening-hours">
                    <h3>Learning Hours</h3>
                    <span>Can changed according to Turor</span>
                    <ul>
                      <li>
                        <span>Mon - Sat</span> <span>8:00 AM - 8:00 PM</span>
                      </li>

                      <li>
                        <span>Sun</span> <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                  <br /> <hr />
                  <div className="vendor-name">
                    <strong>Learn by Good teacher </strong>
                    <p>Pay when your teatching hour has been completed.</p>
                    <strong>Professionals</strong>
                    <p>We have Professionals teacher to help you guide</p>
                    <strong>All Subject</strong>
                    <p>
                      We are increasing subjects to help you study with us 
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

 
  )
}

export default TutorDetailsByIdPage
