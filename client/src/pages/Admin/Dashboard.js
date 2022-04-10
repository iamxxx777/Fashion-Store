// ICONS
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import PaidIcon from '@mui/icons-material/Paid'

// COMPONENTS
import OrderItem from '../../components/Admin/OrderItem'

import '../../styles/Dashboard.scss'

const Dashboard = ({ stats, orders }) => {
    return (
        <div className='dashboard'>
            <div className="container">
                <div className="title">
                    <h1>Dashboard</h1>
                </div>
                <div className="stats">
                    <div className="sales">
                        <div className="icon">
                            <PaidIcon />
                        </div>
                        <div className="stat">
                            <h2>Total Sales</h2>
                            <h3>₦{(stats?.amount)?.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="orders">
                        <div className="icon">
                            <AirportShuttleIcon />
                        </div>
                        <div className="stat">
                            <h2>Total Orders</h2>
                            <h3>{stats?.totalOrders}</h3>
                        </div>
                    </div>
                    <div className="products">
                        <div className="icon">
                            <ShoppingBagIcon />
                        </div>
                        <div className="stat">
                            <h2>Total Products</h2>
                            <h3>{stats?.totalProducts}</h3>
                        </div>
                    </div>
                </div>
                <div className="orders">
                    <h2>Latest Orders</h2>
                    <div className="container">
                        <div className="overflow">
                            {orders?.map((order) => <OrderItem key={order._id} order={order} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard