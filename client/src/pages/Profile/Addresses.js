import { Link } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useAlert } from 'react-alert'


import MenuIcon from '@mui/icons-material/Menu'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import Address from "../../components/Profile/Address"

import '../../styles/ProfileAddresses.scss'

const Addresses = ({ click, addresses }) => {

    const sortedAddresses = addresses?.sort((a, b) => b.main - a.main)
    const { userInfo } = useSelector((state) => state.loginUser)
    const alert = useAlert()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }  

    const handleDelete = async (id) => {
        try {
            if(window.confirm('Delete this address')) {
                const { data } = await axios.delete(`/api/users/profile/${userInfo._id}/address/${id}`, config)
                if(data.success) {
                    alert.success("Address deleted successfully")
                }
                window.location.reload()
            }
        } catch (error) {
            alert.error(error)
        }
        
    }

    return (
        <section className="customer_addresses">
            <div className="addresses_container">
                <div className="addresses_header">
                    <div className="addresses_title">
                        <h2>Addresses <span>({sortedAddresses?.length})</span></h2>
                        <Link to="account">Add Address</Link>
                    </div>
                    <div className="mb_btn">
                        <button onClick={click}> <MenuIcon /> </button>
                    </div>
                </div>
                <div className="addresses">
                    {sortedAddresses?.map((address, i) => <Address key={i} address={address} deleteAddress={handleDelete} />)}
                </div>
                <div className="mobile_add">
                    <button>
                        <Link to="/account/address"><AddOutlinedIcon /></Link>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Addresses