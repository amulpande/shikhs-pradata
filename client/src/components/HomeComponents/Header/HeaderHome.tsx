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
                {/* <div className="main-responsive-nav">
                    <div className="container">
                        <div className="mobile-nav">
                            <ul className="menu-sidebar menu-small-device">
                                <li>
                                    <button className="popup-button">
                                        <i className="fas fa-search" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
                <div className="main-nav">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light bg-light">
                            {/* <a className="navbar-brand" href="index.php">
                                <img src="assets/images/logo23.png" alt="logo" />
                            </a> */}
                            SHIKHSHA-PRADATA LOGO
                            <div
                                className="collapse navbar-collapse mean-menu justify-content-center"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link href="index" className="nav-link">
                                            HOME
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="about.php" className="nav-link">
                                            ABOUT
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link dropdown-toggle">
                                            SERVICES <i className="fas fa-sort-down" />
                                        </a>
                                        <ul className="dropdown-menu">

                                            <li className="nav-item">
                                                <a href="service-details.php?sid=<?php echo $ro1['sid']?>">

                                                </a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="booking.php" className="nav-link">
                                            BOOKING
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="contact.php" className="nav-link">
                                            CONTACT US
                                        </a>
                                    </li>
                                </ul>

                                <div id="mySidebar" className="sidebar">
                                    <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
                                    <a href="profiles.php">PROFILE</a>
                                    <a href="invoice.php">MY BOOKING</a>
                                    <a href="view_cart.php">MY CART</a>
                                    <a href="invoices1.php">MY INVOICE</a>
                                    <a href="login.php">LOGIN</a>
                                    <a href="userreg.php">REGISTER</a>
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
