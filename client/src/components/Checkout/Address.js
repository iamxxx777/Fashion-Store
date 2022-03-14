import React from 'react'
import { Link } from 'react-router-dom'

const Address = ({ address }) => {
    return (
        <div className="main_address">   
            <div className="address_info">
                <div className='info'>
                    <div className="name">
                        <h2>{address.firstName}</h2>
                        <h2>{address.lastName}</h2>
                    </div>
                    <div className="street">
                        <h2>{address.address}</h2>
                    </div>
                    <div className="state">
                        <h2>{address.city}</h2>
                        <h2>{address.state}</h2>
                    </div>
                    <div className="phone">
                        <h2>{address.phone}</h2>
                        <h2>{address.phone2}</h2>
                    </div>
                </div>
                <div className='edit_btn'>
                    <Link>Edit</Link>
                </div>
                <div className="default">{address.main ? 'Default Address' : null}</div>
            </div>
            <button>Use This Address</button>
        </div>
    )
}

export default Address