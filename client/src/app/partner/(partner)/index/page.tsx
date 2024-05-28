'use client'
import { getTutorAllTotalngApi } from '@lib/api/allApi'
import { TutorAllTotalTypes } from '@lib/types/types'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);


const PartnerIndexPage = () => {
    const [tutorAllData, setTutorAllData] = useState<TutorAllTotalTypes>()
    useEffect(() => {
        const fetchhData = async () => {
            try {
                const response = await getTutorAllTotalngApi()
                setTutorAllData(response.data)
            } catch (error) {
                console.error('Error fetching data ', error)
            }
        }
        fetchhData()
    }, [])
    const pieData = {
        labels: ['Pending Request', 'Accepted Request', 'Rejected Request','Total Request'],
        datasets: [
            {
                label: '# of Votes',
                data: [tutorAllData?.pending_request, tutorAllData?.accpted_request, tutorAllData?.rejected_request, tutorAllData?.total_request],
                backgroundColor: ['#36A2EB', '#FF6384', '#E1B919', '#70E45E'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#E1B919', '#70E45E']
            }
        ]
    };
    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                        <div className="card-body">Total Earning</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <h3><i className="fas fa-rupee-sign"></i> {tutorAllData?.total_earning}</h3>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-secondary text-white mb-4">
                        <div className="card-body">Monthly Income</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <h3><i className="fas fa-rupee-sign"></i> {tutorAllData?.monthly_income}</h3>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                        <div className="card-body">Total Pending Request</div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <Link href='/partner/new-booking-request'>
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
                            <Link href='/partner/my-payment'>
                                <h3 className='text-white'>{tutorAllData?.payment_paid}</h3>
                            </Link>
                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                {/* <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-bar me-1"></i>
                            Total Bookings
                        </div>
                        <div className="card-body">
                            <Bar data={barData} />
                        </div>
                    </div>
                </div> */}
                <div className="col-xl-6">


                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-bar me-1"></i>
                            Total Request
                        </div>
                        <div className="card-body">
                            <Pie data={pieData} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PartnerIndexPage
