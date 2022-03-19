import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'


const Address = ({ address, setAsMain, click }) => {

    const set = () => {
        setAsMain(address)
        click()
    }

    return (
        <div className="address">   
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
                        /
                        <h2>{address.phone2}</h2>
                    </div>
                    <div className="default">{address.main ? 'Default Address' : null}</div>
                </div>
                <div className='edit_btn'>
                    <Link to={`/account/editaddress/${address._id}`}><EditOutlinedIcon /></Link>
                </div>
            </div>
            <Button onClick={set}>Use This Address</Button>
        </div>
    )
}

export default Address