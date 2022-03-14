import { Link } from 'react-router-dom'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const Address = ({ address, deleteAddress }) => {

    const handleClick = () => {
        deleteAddress(address._id)
    }

    return (
        <div className="address">
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

                <div className="default">{address.main ? 'Default Address' : null}</div>
            </div>
            <div className="address_btn">
                <div className="default_btn">
                    <button disabled={address.main} 
                        style={address.main ? {color: 'lightgrey'} : null}   
                    >Set As Default</button>
                </div>
                <div className="btns">
                    <button>
                        <Link to={`/account/editaddress/${address._id}`}><EditOutlinedIcon /></Link>
                    </button>
                    {!address.main && 
                    <button onClick={handleClick}>
                        <DeleteOutlineOutlinedIcon />
                    </button>
                }
                </div>
            </div>
        </div>
    )
}

export default Address