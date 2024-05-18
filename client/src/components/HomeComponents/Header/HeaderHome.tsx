'use client'

import Image from "next/image";
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
                                SHIKHSHA-PRADATA
                                {/* <Image src="/assets/images/shikhsha.png" height={20} width={20} alt="Logo"/> */}
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
                                            <Link href="about" as="/about" className="nav-link">
                                                ABOUT
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="tutor-details" as="/tutor-details" className="nav-link">
                                                TUTOR
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/contact-us" as="/contact-us" className="nav-link">
                                                CONTACT US
                                            </Link>
                                        </li>
                                    </ul>
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
