import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import '../../styles/MobileNav.scss'

const MobileNav = ({ click }) => {
    const { cartItems } = useSelector((state) => state.cart)

    return (
        <nav className='mobile_nav'>
            <div className="mobile_nav_container">
                <Link to="/">
                    <div className="mobile_nav_link">
                        <HomeOutlinedIcon />
                        <p>Home</p>
                    </div>
                </Link>

                <button onClick={click}>
                    <div className="mobile_nav_link">
                        <CategoryOutlinedIcon />
                        <p>Category</p>
                    </div>
                </button>

                <Link to="/account">
                    <div className="mobile_nav_link">
                        <PersonOutlineOutlinedIcon />
                        <p>Account</p>
                    </div>
                </Link>

                <Link to="/cart">
                    <div className="mobile_nav_link">
                        <ShoppingCartOutlinedIcon />
                        <p>Cart {cartItems.length > 0 && <span>{cartItems.length}</span>}</p>
                    </div>
                </Link>

            </div>
        </nav>
    )
};

export default MobileNav;
