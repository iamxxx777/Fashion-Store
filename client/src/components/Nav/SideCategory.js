import React from 'react'
import { Link } from 'react-router-dom'

// ICONS
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined'
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined'

// STYLES
import '../../styles/SideCategory.scss'

const SideCategory = ({ click, show }) => {
  return (
    <div className={`side_category ${show && 'slide'}`}>
        <div className="container">
            <Link to="/category/sneakers" onClick={click}>
                <div>
                    <FitnessCenterOutlinedIcon />
                    <p>Sneakers</p>
                </div>
            </Link>
            <Link to="/category/jackets and hoodies" onClick={click}>
                <div>
                    <EmojiNatureOutlinedIcon />
                    <p>Jackets and Hoodies</p>
                </div>
            </Link>
            <Link to="/category/dresses" onClick={click}>
                <div>
                    <EmojiNatureOutlinedIcon />
                    <p>Dresses</p>
                </div>
            </Link>
            <Link to="/category/gym" onClick={click}>
                <div>
                    <FitnessCenterOutlinedIcon />
                    <p>Gym</p>
                </div>
            </Link>
            <Link to="/category/shirts" onClick={click}>
                <div>
                    <FitnessCenterOutlinedIcon />
                    <p>Shirts</p>
                </div>
            </Link>
            <Link to="/category/trousers" onClick={click}>
                <div>
                    <FitnessCenterOutlinedIcon />
                    <p>Trousers</p>
                </div>
            </Link>
            <Link to="/" onClick={click}>
                <div>
                    <EmojiNatureOutlinedIcon />
                    <p>Unisex</p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default SideCategory