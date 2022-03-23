import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import '../../styles/Loader.scss'

const Loader = () => {
    return (
        <div className='loader'>
            <div className="loader_item">
                <ShoppingCartIcon />
            </div>
        </div>
    )
}

export default Loader