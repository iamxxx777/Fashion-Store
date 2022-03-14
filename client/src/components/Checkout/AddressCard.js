import React from 'react'

const AddressCard = ({ address }) => {
    return (
        <div className="main_address">
            <div className="address_head">
                <h2>Your Address</h2>
                <button>Change</button>
            </div>
            <div className="address_info">
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
                    / 
                    <h2>{address.phone2}</h2>
                </div>
            </div>
        </div>
    )
}

export default AddressCard