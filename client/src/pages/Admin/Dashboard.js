// ICONS
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import PaidIcon from '@mui/icons-material/Paid'

// COMPONENTS
import OrderItem from '../../components/Admin/OrderItem'
import Chart from '../../components/Admin/Chart'

import '../../styles/Dashboard.scss'

const Dashboard = ({ stats, orders }) => {
    return (
        <div className="dashboard">
            <div className="container">
                <div className="title">
                    <h1>Dashboard</h1>
                </div>
                <div className="stats">
                    <div className="stat">
                        <div className="icon">
                            <div className="icon_circle sales">
                                <PaidIcon />
                            </div>
                        </div>
                        <div className="stat_info">
                            <h2>Total Sales</h2>
                            <h3>₦{stats?.amount?.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="stat">
                        <div className="icon">
                            <div className="icon_circle orders_stat">
                                <AirportShuttleIcon />
                            </div>
                        </div>
                        <div className="stat_info">
                            <h2>Total Orders</h2>
                            <h3>{stats?.totalOrders}</h3>
                        </div>
                    </div>
                    <div className="stat">
                        <div className="icon">
                            <div className="icon_circle products">
                                <ShoppingBagIcon />
                            </div>
                        </div>
                        <div className="stat_info">
                            <h2>Total Products</h2>
                            <h3>{stats?.totalProducts}</h3>
                        </div>
                    </div>
                </div>
                <Chart data={stats?.graphData} />
                <div className="orders">
                    <h2>Latest Orders</h2>
                    <div className="container">
                        <div className="overflow">
                            {orders?.map((order) => (
                                <OrderItem key={order._id} order={order} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard