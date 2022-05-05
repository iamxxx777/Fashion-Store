import { useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

// MUI ICONS
import MenuIcon from '@mui/icons-material/Menu'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

// COMPONENT
import Address from "../../components/Profile/Address"

// REDUX ACTIONS
import { deleteAddress } from '../../redux/actions/userActions'
import { DELETE_ADDRESS_RESET } from '../../redux/constants/userConstants'


import '../../styles/ProfileAddresses.scss'

const Addresses = ({ click, addresses }) => {

    const sortedAddresses = addresses?.sort((a, b) => b.main - a.main)
    const { result, error } = useSelector((state) => state.deleteAddress)

    const alert = useAlert()
    const dispatch = useDispatch()


    const handleDelete = (id) => {
        dispatch(deleteAddress(id))
    }

    useEffect(() => {
        if(result && result.success) {
            alert.success("Address deleted successfully")
            dispatch({type: DELETE_ADDRESS_RESET})
            window.location.reload()
        } else if(error) {
            alert.error(error)
        }
    }, [dispatch, result, error, alert])

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