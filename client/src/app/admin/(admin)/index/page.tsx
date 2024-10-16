'use client'
import { getAdminTotalEarningApi } from '@lib/api/allApi'
import { AdminAllTotalTypes } from '@lib/types/types'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Pie, Line, Bar } from 'react-chartjs-2';
import PaymentDashboard from '../my-payment/PaymentDashboard';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const AdminIndexPage = () => {
  const [allData, setAlldata] = useState<AdminAllTotalTypes>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminTotalEarningApi()
        setAlldata(response.data)

      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])

  const pieData = {
    labels: ['Total Users', 'Approved Tutors', 'Blocked Tutors'],
    datasets: [
      {
        label: '# of Votes',
        data: [allData?.total_user, allData?.total_approved_tutor, allData?.total_blocked_tutor],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
      }
    ]
  };


  const barData = {
    labels: ['Total Bookings'],
    datasets: [
      {
        label: '# of Bookings',
        data: [allData?.total_booking],
        backgroundColor: ['#36A2EB']
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
              <Link href='/admin/my-payment'>
                <h3 className='text-white'><i className="fas fa-rupee-sign"></i> {allData?.total_earning}</h3>
              </Link>
              <div className="small text-white"><i className="fas fa-angle-right"></i></div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card bg-secondary text-white mb-4">
            <div className="card-body">Last 30 Days Income</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link href='/admin/my-payment'>
                <h3 className='text-white'><i className="fas fa-rupee-sign"></i> {allData?.Last_month_earning}</h3>
              </Link>
              <div className="small text-white"><i className="fas fa-angle-right"></i></div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">Total User</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link href='/admin/user'>
                <h3 className='text-white'>{allData?.total_user}</h3>
              </Link>
              <div className="small text-white"><i className="fas fa-angle-right"></i></div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card bg-danger text-white mb-4">
            <div className="card-body">Total Approved Tutor</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link href='/admin/approved-tutor'>
                <h3 className='text-white'>{allData?.total_approved_tutor}</h3>
              </Link>
              <div className="small text-white"><i className="fas fa-angle-right"></i></div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
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
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-bar me-1"></i>
              Total Bookings
            </div>
            <div className="card-body">
              <Bar data={barData} />
            </div>
          </div>
        </div>
        <div className="col-xl-6">


          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-bar me-1"></i>
              Total User/Tutor
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

export default AdminIndexPage
