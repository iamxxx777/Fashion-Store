import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/Jumbotron.scss'

const Jumbotron = () => {
    return (
        <section className="jumbotron">
            <div className="jumbo_container">
                <div className="jumbo_grid">
                    <div className="jumbo_grid_item jumbo_dresses">
                        <div className="jumbo_img jumbo_dresses_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643146074/Store/Gown_black_remove_qghjoh.png" alt="Slim patterned party gown" />
                        </div>
                        <div className="jumbo_info jumbo_dresses_info">
                            <h2>Dresses</h2>
                            <h1><span>High Fashion</span> patterned party gown</h1>
                            <p>We are majoring in women party dress, skirts, tops, suit and jumpsuits for may years. 100% good quality guarantee at a reasonable price.</p>
                            <Link to="/category/dresses">Shop Now</Link>
                        </div>
                    </div>
                    <div className="jumbo_grid_item jumbo_sneakers">
                        <div className="jumbo_img jumbo_sneakers_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643146075/Store/jordan-ma2-remove_wuxkkc.png" alt="Jordan's MA2" />
                        </div>
                        <div className="jumbo_info jumbo_sneakers_info">
                            <h2>Sneakers</h2>
                            <h1><span>Comfy</span> top quality sneakers</h1>
                            <p>Shatter the sneaker status quo in the Jordan MA2. Made from a mix of suede, full-grain leather and a variety of textiles.</p>
                            <Link to="/category/sneakers">Shop Now</Link>
                        </div>
                    </div>
                    <div className="jumbo_grid_item jumbo_shirts">
                        <div className="jumbo_img jumbo_shirts_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643140972/Store/Vintage-removebg_p4bwdv.png" alt="Vintage Shirt" />
                        </div>
                        <div className="jumbo_info jumbo_shirts_info">
                            <h2>Shirts</h2>
                            <h1><span>Dapper</span> stylish vintage shirts</h1>
                            <p>Are you a fashionista?Do you like to make statements?Do you like being unique and exclusive? Stress not, this shirt has everything you need and more</p>
                            <Link to="/category/shirts">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Jumbotron;
