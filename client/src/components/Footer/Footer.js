import { Link } from 'react-router-dom'

import '../../styles/Footer.scss'

const Footer = () => {
    return (
      <footer className='footer'>
        <div className="footer_container">
            <div className="footer_about">
                <Link to="/"><h2>Chavonn</h2></Link>
                <p>
                    We are a brand focused on bringing the best and only the best of premium and high end fashion items to your doorstep.
                    Browse through different categories of products to find the one that best suit your taste.
                    Whatever you want, we got it.
                </p>
            </div>
            <div className="footer_categories">
                <h2>Categories</h2>
                <div>
                    <Link to="/gender/unisex">Unisex</Link>
                    <Link to="/gender/for-women">For Women</Link>
                    <Link to="/gender/for-men">For Men</Link>
                    <Link to="/category/shirts">Shirts</Link>
                    <Link to="/category/gym">Gym</Link>
                    <Link to="/category/jackets-and-hoodies">Jackets and Hoodies</Link>
                </div>
            </div>

            <div className="footer_customer_care">
                <h2>Customer Care</h2>
                <div className="customer_care_links">
                    <Link to="/">Return Policy</Link>
                    <Link to="/">Lodge A Compliant</Link>
                    <Link to="/">Track Your Order</Link>
                    <Link to="/">How To Buy</Link>
                    <Link to="/">Terms and Conditions</Link>
                </div>
            </div>

            <div className="footer_contact">
                <h2>Contact Us</h2>
                <div className="footer_contact_methods">
                    <div className="contact_method">
                        <span>A.</span>
                        <p>No 15, Bodija Estate, New Bodija, Ibadan, Nigeria</p>
                    </div>
                    <div className="contact_method">
                        <span>E.</span>
                        <p><a href="mailto:hopetomiwa13@gmail.com">hopetomiwa13@gmail.com</a></p>
                    </div>
                    <div className="contact_method">
                        <span>T.</span>
                        <p><a href="tel:+2348166179988">+234-0816-617-9988</a></p>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    )
}

export default Footer;
