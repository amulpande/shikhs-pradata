'use client'
import React, { useEffect, useState } from 'react'
import { TutorType } from '@lib/types/types'
import { getTutorDataByidApi } from '@lib/api/allApi'
import './TutorDetail.module.css'
import Image from 'next/image'
import BookingModelComponent from '@/components/ModalComponent/ModelComponent'
// import { makeStyles } from '@mui/styles';


const TutorDetailsByIdPage = ({ params }:any) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [data, setData] = useState<TutorType>()
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTutorDataByidApi(params.tutorId)
      setData(response.data)
    }
    fetchData()
  }, [params.tutorId])
  return (

    <>
      <div className="uni-banner" >
        <div className="container">
          <div className="uni-banner-text">
            <h1>Service Details</h1>
            <ul>
              <li>
                <a href="index">HOME</a>
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
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="shadow-lg">
                        <Image
                          src={data?.profile_image || ''}
                          className='rounded'
                          width={500}
                          height={500}
                          alt="Tutor Image"
                        />
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="card border-0 shadow">
                        <div className="card-body">
                          <h3 className="card-title text-primary">{data?.first_name + ' ' + data?.last_name}</h3>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex align-items-center">
                              <i className="fa fa-envelope me-2"></i>
                              <span>{data?.email}</span>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                              <i className="fa fa-phone me-2"></i>
                              <span>{data?.contact}</span>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                              <i className="fa fa-map-marker me-2"></i>
                              <span>{data?.city_name}</span>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                              <i className="fa fa-clock me-2"></i>
                              <span>{data?.experience} years of experience</span>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                              <i className="fa fa-book me-2"></i>
                              <span>{data?.subjects_name}</span>
                            </li>
                            <li className="list-group-item">
                              <strong>About:</strong>
                              <span>{data?.short_bio}</span>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                              <i className="fa fa-venus-mars me-2"></i>
                              <span>{data?.gender}</span>
                            </li>
                            <li className="list-group-item d-flex align-items-center">
                              <i className="fa fa-rupee-sign me-2"></i>
                              <span>{data?.price}/- per hour</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <form>
                  <div style={{ justifyContent: 'center' }}>
                    <button type='button' className='btn-md btn btn-dark effect  form-control' onClick={() => setOpen(!open)}>Book Now</button>
                  </div>
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
      <div>

        {data &&
          <BookingModelComponent open={open} handleClose={handleClose} handleOpen={handleOpen} tutorId={params.tutorId} subject_id={data?.subjects} />
        }
      </div>

    </>


  )
}

export default TutorDetailsByIdPage
