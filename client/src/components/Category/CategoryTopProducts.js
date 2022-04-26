import ProductCard from '../Products/ProductCard'

const CategoryTopProducts = ({ products }) => {
    return ( 
        <section className="category_top_products">
            {products &&
                (
                <>
                    <div className="heading">
                        <h1>Top picks for you</h1>
                    </div>
                    <div className="top_products">
                        {products.map((product) => (<ProductCard key={product._id} product={product} />))}
                    </div>
                </>
                )
            }
        </section>
    )
};

export default CategoryTopProducts;
