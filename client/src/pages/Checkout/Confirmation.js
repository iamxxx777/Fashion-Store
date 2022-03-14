import React from 'react'
import { useLocation } from 'react-router-dom'

const Confirmation = () => {

    const location = useLocation()
    console.log(location.state)

    return (
        <div>
            This is the confirmation page
            <div>

            </div>
        </div>
    )
};

export default Confirmation;
