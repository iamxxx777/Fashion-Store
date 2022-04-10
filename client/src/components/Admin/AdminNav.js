import React from 'react'
import { Link } from 'react-router-dom'

// ICONS
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

// STYLES
import '../../styles/Admin.scss'

const AdminNav = ({ toggle, click, logout }) => {
    return (
        <nav className={`admin_nav ${toggle && 'show'}`}>
            <div className="container">
                <div className="logo">
                    <h2>G-store</h2>
                    <button onClick={click}><MenuOpenOutlinedIcon /></button>
                </div>
                <div className="links">
                    <Link to="/admin" onClick={() => click()}>
                        <div>
                            <HomeOutlinedIcon />
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link to="/admin" onClick={() => click()}>
                        <div>
                            <ShoppingBagOutlinedIcon />
                            <p>Products</p>
                        </div>
                    </Link>
                    <Link to="/admin/orders" onClick={() => click()}>
                        <div>
                            <ShoppingCartOutlinedIcon />
                            <p>Orders</p>
                        </div>
                    </Link>
                    <Link to="/admin" onClick={() => click()}>
                        <div>
                            <AddCircleOutlineOutlinedIcon />
                            <p>Add Product</p>
                        </div>
                    </Link>
                    <Link to="/admin" onClick={() => click()}>
                        <div>
                            <PaidOutlinedIcon />
                            <p>Transactions</p>
                        </div>
                    </Link>
                    <Link to="/admin" onClick={() => click()}>
                        <div>
                            <PersonOutlineOutlinedIcon />
                            <p>Account</p>
                        </div>
                    </Link>
                    <Link to="/admin" onClick={() => click()}>
                        <div>
                            <InsertChartOutlinedTwoToneIcon />
                            <p>Stats</p>
                        </div>
                    </Link>
                </div>
                <div className="logout">
                    <button onClick={logout}>
                        <LogoutOutlinedIcon />
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav