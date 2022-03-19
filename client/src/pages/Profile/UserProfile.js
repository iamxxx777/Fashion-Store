import React from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MenuIcon from '@mui/icons-material/Menu'

import '../../styles/Account.scss'

const UserProfile = ({ click, user, orders }) => {

    const pendingOrders = orders.filter((order) => order.status === "pending")
    const shippedOrders = orders.filter((order) => order.status === "shipped")
    const completedOrders = orders.filter((order) => order.status === "delivered")

    return (
        <section className="customer_profile">
            <div className="container">
                <div className="customer_profile_header">
                    <div className="title">
                        <PersonOutlineOutlinedIcon />
                        <h2>Account Overview</h2>
                    </div>
                    <div className="mb_btn">
                        <button onClick={click}> <MenuIcon /> </button>
                    </div>
                </div>
                <div className="profile_info">
                    <div className="info_container">
                        <div className="info_item">
                            <h3>Firstname</h3>
                            <h4>{user.firstName}</h4>
                        </div>
                        <div className="info_item">
                            <h3>Lastname</h3>
                            <h4>{user.lastName}</h4>
                        </div>
                        <div className="info_item">
                            <h3>Email</h3>
                            <h4>{user.email}</h4>
                        </div>
                        <div className="info_item">
                            <h3>Phone</h3>
                            <h4>{user.phone ? user.phone : 'Not Provided'}</h4>
                        </div>
                    </div>
                    <div className="profile_orders">
                        <h3>Order Summary</h3>
                        <div className="order_summary">
                            <div className="order_summary_item">
                                <h3>{orders.length}</h3>
                                <h4>All Orders</h4>
                            </div>
                            <div className="order_summary_item">
                                <h3>{completedOrders.length}</h3>
                                <h4>Completed Orders</h4>
                            </div>
                            <div className="order_summary_item">
                                <h3>{pendingOrders.length}</h3>
                                <h4>Pending Orders</h4>
                            </div>
                            <div className="order_summary_item">
                                <h3>{shippedOrders.length}</h3>
                                <h4>Awaiting Delivery</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserProfile