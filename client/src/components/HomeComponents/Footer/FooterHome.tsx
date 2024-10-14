import Link from "next/link"
const FooterHome = () => {

    return (
        <>
            <div className="footer pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="footer-logo-area">
                                <Link href='#'>
                                    <h3 className="text-white">
                                        SHIKHSHA PRADATA
                                    </h3>
                                </Link>
                                <p>
                                    We are here to help you learn better and get good Marks
                                </p>
                                <div className="footer-social-links">
                                    <span>Follow Us: </span>
                                    <ul>
                                        <li>
                                            <Link href="#">
                                                <i className="fab fa-facebook-f" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i className="fab fa-twitter" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i className="fab fa-instagram" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i className="fab fa-pinterest-p" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="footer-links footer-contact">
                                <h3>Contact Us</h3>
                                <ul>
                                    <li>
                                        <i className="fas fa-map-marker-alt" />
                                        <p>Location:</p>
                                        <Link href="#">Vapi, Gujrat, India</Link>
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope" />
                                        <p>Email:</p>
                                        <Link href="#">shikhshapradata@sp.in</Link>
                                    </li>
                                    <li>
                                        <i className="fas fa-phone-alt" />
                                        <p>Phone:</p>
                                        <Link href="tel:9988776655">9988776655</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="footer-links footer-quick-links">
                                <h3>Quick Links</h3>
                                <ul>
                                    <li>
                                        <Link href="/index">
                                            <i className="fas fa-long-arrow-alt-right" /> Home{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about">
                                            <i className="fas fa-long-arrow-alt-right" /> About Us{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/tutor-details">
                                            <i className="fas fa-long-arrow-alt-right" /> Tutor{" "}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/contact-us">
                                            <i className="fas fa-long-arrow-alt-right" /> Contact{" "}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className="footer-links">
                                <h3>Subscribe</h3>
                                <p>Subscribe To Our Newsletter To Get Our Updated News!</p>
                                <form>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Your Email"
                                        />
                                        <button className="btn" type="submit">
                                            <i className="fas fa-envelope-open" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <p>
                        © Copyright 2024, All Rights Reserved.{" "}
                        <Link href="#">SHIKHA PRADATA</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default FooterHome
