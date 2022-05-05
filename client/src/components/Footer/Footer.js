import { Link } from 'react-router-dom'

import '../../styles/Footer.scss'

const Footer = () => {
    return (
      <footer className='footer'>
        <div className="footer_container">
            <div className="footer_about">
                <h2>G-Store</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Esse velit quas hic ad ut magni nobis ullam omnis! Iusto repellat 
                    voluptates vero nemo ea autem!
                </p>
            </div>
            <div className="footer_categories">
                <h2>Categories</h2>
                <div>
                    <Link to="/cart">Unisex</Link>
                    <Link to="/cart">For Women</Link>
                    <Link to="/cart">For Men</Link>
                    <Link to="/cart">Shirts</Link>
                    <Link to="/cart">Gym</Link>
                    <Link to="/cart">Jackets and Hoodies</Link>
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
