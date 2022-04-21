import { useState } from 'react'

import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import '../../styles/Search.scss'

const SearchTitle = ({ keyword, totalNumber, sort, sortKey }) => {

    const [showOptions, setShowOptions] = useState(false)

    if(sortKey === 'updatedAt') sortKey = 'Date'
    if(sortKey === 'undefined') sortKey = 'Popularity'

    return (
        <div className='search_title'>
            <div className="titlee">
                {keyword ? <h2>Showing results for <span>{keyword}</span></h2> : <h2 className="mega">Products</h2>}
                <h3><span>{totalNumber}</span> items found</h3>
            </div>
            <div className="sort">
                <h3>Sort by: <span>{sortKey || 'Popularity'} <button className={showOptions ? 'rotate' : null} onClick={() => setShowOptions(!showOptions)}><ArrowRightIcon /></button></span></h3>
                {showOptions && <div className="options">
                    <button onClick={() => {sort('', ''); setShowOptions(false)}}>Popularity</button>
                    <button onClick={() => {sort('price', 'desc'); setShowOptions(false)}}>Price: High to Low</button>
                    <button onClick={() => {sort('price', 'asc'); setShowOptions(false)}}>Price: Low to High</button>
                    <button onClick={() => {sort('updatedAt', 'desc'); setShowOptions(false)}}>Date</button>
                    <button onClick={() => {sort('ratings', 'desc'); setShowOptions(false)}}>Ratings</button>
                </div>}
            </div>
        </div>
    )
}

export default SearchTitle