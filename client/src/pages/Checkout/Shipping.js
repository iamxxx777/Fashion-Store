import React from 'react'

import '../../styles/Checkout.scss'


const Shipping = () => {
  return (
    <main className="shipping_address">
    <div className="shipping_container">
        <Meta title="shipping details" />
        <CustomizedSteps activeStep={0} />
    </div>
    </main>
  )
}

export default Shipping