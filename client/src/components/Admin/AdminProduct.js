import { Link } from 'react-router-dom'
import Ratings from "../Products/Ratings"

// MUI ICONS
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

// STYLES
import '../../styles/AdminProduct.scss'

const AdminProduct = ({ product, deleteItem }) => {
    return (
        <div className='admin_product'>
            <div className="container">
                <div className="img_container">
                    <img src={product.images[0].url} alt={product.name} />
                </div>
                <div className="info">
                    <div className="product_info">
                        <h2>{product.name}</h2>
                        <Ratings value={product.ratings} />
                        <h3>₦{product.price}</h3>
                    </div>
                    <div className="btns">
                        <button className="del_btn" onClick={() => deleteItem(product._id, product.name)}><DeleteOutlineOutlinedIcon /></button>
                        <button className="add_btn"><Link to={`/admin/editproduct/${product._id}`}><EditOutlinedIcon /></Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProduct