import React from 'react'
import { Link } from 'react-router-dom'

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'

const Order = ({ status }) => {

    const colorScheme = {
        delivered: '#27cf2f',
        pending: '#0F3460',
        cancelled: "#d60a2c"
    }


  return (
    <Link to={'/account/order'}>
        <div className='user_order'>
            <div className="order_id">
                <h3>61c8e3d291f8e54b19f922d6</h3>
            </div>
            <div className="order_date">
                <h3>04 Jun, 2022</h3>
            </div>
            <div className="order_price">
                <h3>₦124,570</h3>
            </div>
            <div className="order_total">
                <h3>2</h3>
            </div>
            <div className="order_status">
                <span style={{backgroundColor: colorScheme[`${status}`]}}></span>
                <h3 style={{color: colorScheme[`${status}`]}}>{status}</h3>
            </div>
            <div className="more_btn">
                <Link to={'/account/order'}>
                    <ArrowCircleRightOutlinedIcon /> 
                </Link>
            </div>
        </div>
    </Link>
  )
}

export default Order