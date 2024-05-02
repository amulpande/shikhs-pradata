'use client'

import Link from "next/link";

const openNav = () => {
    const sidebar = document.getElementById("mySidebar");
    const mainContent = document.getElementById("main");
    if (sidebar && mainContent) {
        sidebar.style.width = "250px";
        mainContent.style.marginRight = "250px";
    } else {
        console.error("Sidebar or main content element not found.");
    }
};

const closeNav = () => {
    const sidebar = document.getElementById("mySidebar");
    const mainContent = document.getElementById("main");
    if (sidebar && mainContent) {
        sidebar.style.width = "0";
        mainContent.style.marginRight = "0";
    } else {
        console.error("Sidebar or main content element not found.");
    }
};

const HeaderHome = () => {
    const handleNavClose = () => {
        openNav();
    }
    return (
        <>
            <div className="header-area">
                <div className="navbar-area">
                    <div className="main-responsive-nav">
                        <div className="container">
                            <div className="mobile-nav">
                                {/* <ul className="menu-sidebar menu-small-device">
                                <li>
                                    <button className="popup-button">
                                        <i className="fas fa-search" />
                                    </button>
                                </li>
                            </ul> */}
                            </div>
                        </div>
                    </div>
                    <div className="main-nav">
                        <div className="container">
                            <nav className="navbar navbar-expand-md navbar-light bg-light">
                                SHIKHSHA-PRADATA LOGO
                                <div
                                    className="collapse navbar-collapse mean-menu justify-content-center"
                                    id="navbarSupportedContent"
                                >
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link href="index" as="/index" className="nav-link">
                                                HOME
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="about" className="nav-link">
                                                ABOUT
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link dropdown-toggle">
                                                SUBJECT <i className="fas fa-sort-down" />
                                            </a>
                                            <ul className="dropdown-menu">

                                                <li className="nav-item">
                                                    <Link href={`tutor-details/${1}`}>
                                                        ENGLISH
                                                    </Link>
                                                </li>

                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="tutor-details" as="/tutor-details" className="nav-link">
                                                TUTOR
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="contact-us" as="/contact-us" className="nav-link">
                                                CONTACT US
                                            </Link>
                                        </li>
                                    </ul>

                                    <div id="mySidebar" className="sidebar">
                                        <Link href="#" className="closebtn" onClick={closeNav}>&times;</Link>
                                        <Link href="profile" as='/profile'>PROFILE</Link>
                                        <Link href="invoice" as='/my-booking' >MY BOOKING</Link>
                                        <Link href="view-cart" as="view-cart" >MY CART</Link>
                                        <Link href="invoices1">MY INVOICE</Link>
                                        <Link href="login">LOGIN</Link>
                                        <Link href="register">REGISTER</Link>
                                    </div>
                                    <div id="main">
                                        <button className="openbtn" onClick={handleNavClose}>&#9776;</button>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default HeaderHome
