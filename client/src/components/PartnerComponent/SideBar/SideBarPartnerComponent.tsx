import Link from 'next/link';
import React, { useState } from 'react';
const SideBarPartner = ({ children }: any) => {
  return (
    <>
      <div id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:bg-gray-600 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-600">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/partner/index" className="flex items-center p-2 text-gray-500 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                <i className="fa fa-home w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/partner/new-booking-request" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-book w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Pending</span>
              </Link>
            </li>
            <li>
              <Link href="/partner/total-booking" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-book w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Total-Booking</span>
              </Link>
            </li>
            <li>
              <Link href="/partner/partner-profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-user w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link href="/partner/my-feedback" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-comments w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">My-Feedback</span>
              </Link>
            </li>
            <li>
              <Link href="/partner/my-payment" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-credit-card w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">My-Payment</span>
              </Link>
            </li>
          </ul>
        </div >
      </div >


    </>
  );
};

export default SideBarPartner;