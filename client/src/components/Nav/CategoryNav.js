import { useState } from 'react'
import { Link } from 'react-router-dom'

// ICONS
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined'
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined'

// STYLES
import '../../styles/CategoryNav.scss'

const CategoryNav = () => {
    const [drop, setDrop] = useState(false)

    return (
        <div className='category_nav'>
            <div className="header_nav">
                <div className="header_nav_category_btn">
                    <button onClick={() => setDrop(!drop)}>
                        <div className="header_nav_category_left">
                            <CategoryOutlinedIcon />
                            <h3>Categories</h3>
                        </div>
                        <div className={`header_nav_category_right ${drop && 'rotate'}`}>
                            <ChevronRightOutlinedIcon />
                        </div>
                    </button>
                    <div className={`header_dropdown ${drop && "show"}`}>
                        <Link to="/category/sneakers" onClick={() => setDrop(false)}>
                            <div>
                                <FitnessCenterOutlinedIcon />
                                <p>Sneakers</p>
                            </div>
                        </Link>
                        <Link to="/category/jackets-and-hoodies" onClick={() => setDrop(false)}>
                            <div>
                                <EmojiNatureOutlinedIcon />
                                <p>Jackets and Hoodies</p>
                            </div>
                        </Link>
                        <Link to="/category/dresses" onClick={() => setDrop(false)}>
                            <div>
                                <EmojiNatureOutlinedIcon />
                                <p>Dresses</p>
                            </div>
                        </Link>
                        <Link to="/category/gym" onClick={() => setDrop(false)}>
                            <div>
                                <FitnessCenterOutlinedIcon />
                                <p>Gym</p>
                            </div>
                        </Link>
                        <Link to="/category/shirts" onClick={() => setDrop(false)}>
                            <div>
                                <FitnessCenterOutlinedIcon />
                                <p>Shirts</p>
                            </div>
                        </Link>
                        <Link to="/category/trousers" onClick={() => setDrop(false)}>
                            <div>
                                <FitnessCenterOutlinedIcon />
                                <p>Trousers</p>
                            </div>
                        </Link>
                        <Link to="/gender/unisex" onClick={() => setDrop(false)}>
                            <div>
                                <EmojiNatureOutlinedIcon />
                                <p>Unisex</p>
                            </div>
                        </Link>
                        <Link to="/gender/for-men" onClick={() => setDrop(false)}>
                            <div>
                                <FitnessCenterOutlinedIcon />
                                <p>For Men</p>
                            </div>
                        </Link>
                        <Link to="/gender/for-women" onClick={() => setDrop(false)}>
                            <div>
                                <FitnessCenterOutlinedIcon />
                                <p>For Women</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="header_nav_links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/account">Account</Link>
                    <Link to="/">Contact Us</Link>
                </div>
            </div>
        </div>
    )
};

export default CategoryNav
