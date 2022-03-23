import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

import Order from '../../components/Profile/Order'

import '../../styles/CustomerOrders.scss'

const UserOrders = ({ click, orders }) => {
    return (
        <section className="user_orders">
            <div className="user_orders_container">
                <div className="user_orders_header">
                    <div className="user_orders_title">
                        <div>
                            <ShoppingBagOutlinedIcon />
                            <h1>My Orders</h1>
                        </div>
                        <h2>{orders.length} Orders found</h2>
                    </div>
                    <div className="mb_btn">
                        <button onClick={click}> <MenuIcon /> </button>
                    </div>
                </div>
                <div className="orders">
                    <div className="orders_title">
                        <h2>ID</h2>
                        <h2>Date</h2>
                        <h2>Price</h2>
                        <h2>No Items</h2>
                        <h2>Status</h2>
                    </div>
                    <div className="orders_list">
                        {orders.map((order) => <Order key={order._id} order={order} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserOrders