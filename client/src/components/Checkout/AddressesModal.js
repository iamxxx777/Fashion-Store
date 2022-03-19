import Address from './Address'

import Button from '@mui/material/Button'

//MUI ICONS
import CloseIcon from '@mui/icons-material/Close'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'


const AddressesModal = ({ data, setAsMain, setActive, click }) => {

    const setToActive = () => {
        setActive(2)
    }

    return (
        <section className="addresses_modal">
            <div className="head">
                <div className="title">
                    <button onClick={click}><CloseIcon /></button>
                    <h2>Address Book</h2>
                </div>
                <div className="add_btn">
                    <button onClick={setToActive}>
                        <AddOutlinedIcon />
                    </button>
                </div>
            </div>
            <div className="addresses">
                {data?.map((address) => (<Address key={address._id} click={click} address={address} setAsMain={setAsMain} />))}
            </div>
            <div className="close">
                <Button onClick={click} size="large" fullWidth variant="contained">Close</Button>
            </div>
        </section>
    )
}

export default AddressesModal