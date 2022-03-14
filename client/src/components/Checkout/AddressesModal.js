import React from 'react'

import Address from './Address'

import Button from '@mui/material/Button'

const AddressesModal = ({ data }) => {
    return (
        <section className="addresses_modal">
            <div className="head">
                <button>X</button>
                <h2>Address Book</h2>
            </div>
            <div className="add_btn">
                <Button>Add a new address</Button>
            </div>
            <div className="addresses">
                <h2>Addresses</h2>
                <div className="container">
                    {data?.map((address) => (<Address key={address._id} address={address} />))}
                </div>
            </div>
            <div className="close">
                <Button size="large" variant="contained">Close</Button>
            </div>
        </section>
    )
}

export default AddressesModal