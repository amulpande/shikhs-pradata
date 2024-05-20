'use client'
import { getTutorAllTotalngApi } from '@lib/api/allApi'
import { TutorAllTotalTypes } from '@lib/types/types'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'


const PartnerIndexPage = () => {
    const [tutorAllData, setTutorAllData] = useState<TutorAllTotalTypes>()
    useEffect(()=>{
        const fetchhData = async () => {
            try {
                const response =await getTutorAllTotalngApi()
                setTutorAllData(response.data)
            } catch (error) {
                console.error('Error fetching data ',error)
            }
        }
        fetchhData()
    },[])
    console.log(tutorAllData)
    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                        <div className="card-body">Total Earning</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <h3>{tutorAllData?.total_earning}</h3>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-secondary text-white mb-4">
                        <div className="card-body">Monthly Income</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <h3> {tutorAllData?.monthly_income}</h3>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                        <div className="card-body">Total Pending Request</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <Link href='/admin/user'>
                                <h3 className='text-white'>{tutorAllData?.pending_request}</h3>
                            </Link>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                        <div className="card-body">Paid</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <Link href='/admin/approved-tutor'>
                                <h3 className='text-white'>{tutorAllData?.payment_paid}</h3>
                            </Link>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

                {/* <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                        <div className="card-body">Total Blocked Tutor</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <Link href='/admin/blocked-tutor'>
                                <h3 className='text-white'>{allData?.total_blocked_tutor}</h3>
                            </Link>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-info text-white mb-4">
                        <div className="card-body">Total Booking</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <Link href='/admin/order-booking'>
                                <h3 className='text-white'>{allData?.total_booking}</h3>
                            </Link>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default PartnerIndexPage
