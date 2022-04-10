import React from 'react'
import { Link } from 'react-router-dom'

import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircle'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccounts'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAlt'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'

import '../../styles/Account.scss'

const AccountNav = ({ toggle, click, logout }) => {

    return (
        <nav className={`account_nav ${toggle && 'show'}`}>
            <div className="nav_container">
                <div className="account_dashboard">
                    <h2>Dashboard</h2>
                    <div className="dashboard_links">
                        <button onClick={click}>
                            <Link to="/account">
                                <PersonOutlineOutlinedIcon />
                                <span>My Account</span>
                            </Link>
                        </button>
                        <button onClick={click}>
                            <Link to="/account/orders">
                                <ShoppingCartOutlinedIcon />
                                <span>Orders</span>
                            </Link>
                        </button>
                        <button onClick={click}>
                            <Link to="/account/addresses">
                                <PersonPinCircleOutlinedIcon />
                                <span>Addresses</span>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="account_quick_links">
                    <h2>Quick Links</h2>
                    <div className="quick_links">
                        <button onClick={click}>
                            <Link to="/account/editProfile">
                                <ManageAccountsOutlinedIcon />
                                <span>Edit Profile</span>
                            </Link>
                        </button>
                        <button onClick={click}>
                            <Link to="/account/address">
                                <AddLocationAltOutlinedIcon />
                                <span>Add Address</span>
                            </Link>
                        </button>
                        <button onClick={click}>
                            <Link to={'/account/changepass'}>
                                <KeyOutlinedIcon />
                                <span>Change Password</span>
                            </Link>
                        </button>
                        <button onClick={logout}>
                            <ExitToAppOutlinedIcon />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AccountNav