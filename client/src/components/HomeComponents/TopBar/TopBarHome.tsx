'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authLogout } from '../../../../lib/slices/auth-slice/auth-slice'
import { AppBar, Toolbar, Grid, Button, IconButton } from '@mui/material';
import { RooState } from '../../../../lib/store/store'
import { useRouter } from 'next/navigation'

const TopBarHome = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: RooState) => state.authData.isAuthenticated)
  const router = useRouter()
  // useEffect(()=>{

  // },[dispatch])
  return (
    <>
      <meta charSet="UTF-8" />
      <title>SHIKHA PRADATA</title>
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      {/* <link type="image/x-icon" />
       */}
      <link rel="icon" href="/next.svg" />
      <div className="topbar">
        <div className="container">
          <div className="topbar-content">
            <div className="row align-items-center">
              <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="top-contact-area">
                  <ul>
                    <li>
                      <span>
                        <a href="#">
                          <i className="fa fa-phone"> 9909887766</i>
                        </a>
                      </span>
                    </li>
                    <li>
                      <span>
                        <a href="#">
                          <i className="fab fa-whatsapp" />
                        </a>
                      </span>
                    </li>
                    <li>
                      <span>
                        <a href="#">
                          <i className="fa fa-envelope" />
                        </a>
                      </span>
                    </li>
                    <li>
                      <span>
                        <a href="#">
                          <i className="" />
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="topbar-right-area">
                  <div className="dropdown account-details">

                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* <i className="fas fa-user"></i> */}
                      <i className="fas fa-chalkboard-teacher"></i>
                      <strong> TUTOR</strong>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" href="/partner/index">
                          TUTOR PROFILE
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" href="/login">
                          LOGIN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/tutor-register">
                          REGISTRATION
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown account-details">
                    {isAuth ?

                      <button className="btn bg-transparent" type="button"
                        id="dropdownMenuButton1"
                        onClick={() => {
                          setTimeout(() => {
                            dispatch(authLogout())
                            router.push('/login')
                          }, 500)
                        }}
                      >
                        {/* <i className="fa fa-sign"></i> */}
                        {/* <i className="far fa-sign-out"></i> */}
                        <strong>LOGOUT</strong>
                      </button>
                      : " "}
                  </div>

                  <div className="dropdown account-details">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user"></i>
                      <strong>USER</strong>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {isAuth ? // is user is logged in than no needs to show him login/registration page
                        <>
                          <li>
                            <Link className="dropdown-item" href="/profile">
                              MY PROFILE
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="/my-booking">
                              MY-BOOKING
                            </Link>
                          </li>
                        </>
                        :
                        <>

                          <li>
                            <Link className="dropdown-item" href="/login">
                              LOGIN
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" href="/register">
                              REGISTRATION
                            </Link>
                          </li>
                        </>

                      }


                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopBarHome
