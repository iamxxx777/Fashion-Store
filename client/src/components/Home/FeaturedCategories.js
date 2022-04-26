import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/FeaturedCategories.scss'

const FeaturedCategories = () => {
    return (
        <section className="featured_categories">
            <div className="featured_categories_container">
                <div className="featured_categories_title">
                    <h2>Featured Categories</h2>
                </div>
                <div className="categories">
                    <div className="category">
                        <div className="category_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643716073/Store/lady_fkiea5.jpg" alt="stylish lady in jean jackets" />
                        </div>
                        <div className="category_info">
                            <h2>For Her</h2>
                            <h3>You want it, we got it</h3>
                            <Link to="/gender/for-women">Shop Now</Link>
                        </div>
                    </div>

                    <div className="category">
                        <div className="category_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643716053/Store/men_dark_yxopic.jpg" alt="dolled up man in shades" />
                        </div>
                        <div className="category_info">
                            <h2>For Him</h2>
                            <h3>You want it, we got it</h3>
                            <Link to="/gender/for-men">Shop Now</Link>
                        </div>
                    </div>

                    <div className="category">
                        <div className="category_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643716058/Store/red_sneaker_kdj0dz.jpg" alt="nike sneakers in a red background" />
                        </div>
                        <div className="category_info">
                            <h2>Sneakers</h2>
                            <h3>You want it, we got it</h3>
                            <Link to="/category/sneakers">Shop Now</Link>
                        </div>
                    </div>

                    <div className="category">
                        <div className="category_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643716062/Store/box_eocpnf.jpg" alt="Boxer lady in red gloves" />
                        </div>
                        <div className="category_info">
                            <h2>Fitness</h2>
                            <h3>You want it, we got it</h3>
                            <Link to="/category/gym">Shop Now</Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
};

export default FeaturedCategories;
