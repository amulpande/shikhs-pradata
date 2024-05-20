'use client'
import { getAdminTotalEarningApi } from '@lib/api/allApi'
import { AdminAllTotalTypes } from '@lib/types/types'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2';

const AdminIndexPage = () => {
  const [allData, setAlldata] = useState<AdminAllTotalTypes>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminTotalEarningApi()
        // console.log('response ',response.data)
        setAlldata(response.data)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">Total Earning</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <h3>{allData?.total_Earning}</h3>
              <div className="small text-white"><i className="fas fa-angle-right"></i></div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card bg-secondary text-white mb-4">
            <div className="card-body">Last 30 Days Income</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <h3> {allData?.Last_month_earning}</h3>
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
    </>

  )
}

export default AdminIndexPage
