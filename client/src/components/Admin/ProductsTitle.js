import { useState } from 'react'
import { Link } from 'react-router-dom'

// MUI ICONS
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const ProductsTitle = ({ sort, sortKey, filter, filterKey, keyword }) => {

    const [showOptions, setShowOptions] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    if(sortKey === 'updatedAt') sortKey = 'Date'
    if(sortKey === 'undefined') sortKey = 'Popularity'
    if(filterKey === 'undefined') sortKey = 'All'


    return (
        <div className='title'>
            <div className="top">
                <h1>Products</h1>
                <Link to="/admin/addproduct">
                    <button><AddOutlinedIcon /> Create New</button>
                </Link>
            </div>
            <div className="filters">
                {!keyword && <div className="filter">
                    <h3>Category: <span>{filterKey || 'All'} <button className={showFilter ? 'rotate' : null} onClick={() => setShowFilter(!showFilter)}><ArrowRightIcon /></button></span></h3>
                    {showFilter && <div className="options">
                        <button onClick={() => {filter('', ''); setShowFilter(false)}}>All</button>
                        <button onClick={() => {filter('sneakers'); setShowFilter(false)}}>Sneakers</button>
                        <button onClick={() => {filter('dresses'); setShowFilter(false)}}>Dresses</button>
                        <button onClick={() => {filter('gym'); setShowFilter(false)}}>Gym</button>
                        <button onClick={() => {filter('shirts'); setShowFilter(false)}}>Shirts</button>
                        <button onClick={() => {filter('trousers'); setShowFilter(false)}}>Trousers</button>
                        <button onClick={() => {filter('jackets and hoodies'); setShowFilter(false)}}>Jackets and Hoodies</button>
                    </div>}
                </div>}
                <div className="sort">
                    <h3>Sort By: <span>{sortKey || 'Popularity'} <button className={showOptions ? 'rotate' : null} onClick={() => setShowOptions(!showOptions)}><ArrowRightIcon /></button></span></h3>
                    {showOptions && <div className="options">
                        <button onClick={() => {sort('', ''); setShowOptions(false)}}>Popularity</button>
                        <button onClick={() => {sort('price', 'desc'); setShowOptions(false)}}>Price: High to Low</button>
                        <button onClick={() => {sort('price', 'asc'); setShowOptions(false)}}>Price: Low to High</button>
                        <button onClick={() => {sort('updatedAt', 'desc'); setShowOptions(false)}}>Date: New to Old</button>
                        <button onClick={() => {sort('updatedAt', 'asc'); setShowOptions(false)}}>Date: Old to New</button>
                        <button onClick={() => {sort('ratings', 'desc'); setShowOptions(false)}}>Ratings</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProductsTitle