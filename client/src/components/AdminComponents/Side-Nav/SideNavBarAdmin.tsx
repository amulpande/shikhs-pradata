'use client'
import Link from 'next/link';
import React, { useState } from 'react';
const SideNavBarAdmin = ({ children }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTutorDropdownOpen, setIsTutorDropdownOpen] = useState(false);

  const toggleCityDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // const.
  // setIsTutorDropdownOpen(!isTutorDropdownOpen)
  return (
    <>
      <div id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-home w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="user" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-user w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">User</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/subjects" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-user w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Subject</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/order-booking" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-book w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">Booking</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/tutor-feedback" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <i className="fa fa-comments w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ms-3">FeedBack</span>
              </Link>
            </li>

            <li>
              <Link href="" className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={toggleCityDropdown}>
                <div className="flex items-center">
                  <i className="fa fa-solid fa-city w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="ms-3">City</span>
                </div>
                <svg className={`w-4 h-4 ml-2 ${isDropdownOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 12a1 1 0 0 1 .707.293l4 4a1 1 0 0 1-1.414 1.414L10 14.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 .707-.293z" clipRule="evenodd" />
                </svg>
              </Link>
              <ul className={`pl-5 ${isDropdownOpen ? '' : 'hidden'}`}>
                <li>
                  <Link href="/admin/add-city" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Add-City</Link>
                </li>
                <li>
                  <Link href="/admin/view-city" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">view-City</Link>
                </li>
                {/* <li>
                  <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Option 3</Link>
                </li> */}
              </ul>
            </li>
            {/* tutor accpet or reject */}
            <li>
              <a href="#" className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => setIsTutorDropdownOpen(!isTutorDropdownOpen)}>
                <div className="flex items-center">
                  <i className="fa fa-users w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                  <span className="ms-3">Tutor</span>
                </div>
                <svg className={`w-4 h-4 ml-2 ${isTutorDropdownOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 12a1 1 0 0 1 .707.293l4 4a1 1 0 0 1-1.414 1.414L10 14.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 .707-.293z" clipRule="evenodd" />
                </svg>
              </a>
              <ul className={`pl-5 ${isTutorDropdownOpen ? '' : 'hidden'}`}>
                <li>
                  <div className='flex items-center'>
                    <i className="fa fa-user w-5 h-5 text-gray-500 mr-2 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>

                    <Link href="/admin/new-tutor" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">New Join Tutor</Link>
                  </div>
                </li>
                <li>
                  <div className='flex items-center'>
                    <i className="fas fa-user-check w-5 h-5 text-gray-500 mr-2 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                    <Link href="/admin/approved-tutor" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Approved Tutor</Link>
                  </div>
                </li>
                <li>
                  <div className='flex items-center'>
                    <i className="fa fa-ban w-5 h-5 text-gray-500 mr-2 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                    <Link href="/admin/blocked-tutor" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Blocked Tutor</Link>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div >
      </div >


    </>
  );
};

export default SideNavBarAdmin;