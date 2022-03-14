import { Link } from "react-router-dom"
import Ratings from './Ratings'

import "../../styles/Product.scss"

const Product = ({ product }) => {
    return (
        <div className='product'>
            <Link to={`/product/${product._id}`}>
                <div className="product_container">
                    <div className="img">
                        <img
                            src={product.images[0].url}
                            alt={product.name}
                        />
                    </div>
                    <div className="product_info">
                        <h2>{product.name}</h2>
                        <Ratings value={product.ratings} />
                        <h3>₦{product.price}</h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Product
