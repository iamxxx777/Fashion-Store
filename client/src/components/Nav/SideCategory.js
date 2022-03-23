import React from 'react'
import { Link } from 'react-router-dom'

// ICONS
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined'
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined'


const SideCategory = () => {
  return (
    <div className='side_category'>
        <div className="container">
            <Link to="/category/sneakers" onClick={() => setDrop(false)}>
                <div>
                    <FitnessCenterOutlinedIcon />
                    <p>Sneakers</p>
                </div>
            </Link>
            <Link to="/category/jackets and hoodies" onClick={() => setDrop(false)}>
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
            <Link to="/" onClick={() => setDrop(false)}>
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