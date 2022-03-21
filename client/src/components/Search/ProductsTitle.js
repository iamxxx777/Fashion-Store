import { useState } from 'react'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import '../../styles/Search.scss'

const ProductTitle = ({ keyword, totalNumber }) => {

    const history = useHistory()
    const path = useRouteMatch()
    const { keyword, pageNumber } = useParams()
    const [sortParams, setSortParams] = useState("Popularity")
    const [showOptions, setShowOptions] = useState(false)
    console.log(path)

    const handleClick = (params) => {
        setSortParams(params)
        history.push('/')
    }

    return (
        <div className='search_title'>
            <div className="title">
                <h2>{keyword}</h2>
                <h3><span>{totalNumber}</span> results found</h3>
            </div>
            <div className="sort">
                <h3>Sort by: <span>{sortParams} <button className={showOptions && 'rotate'} onClick={() => setShowOptions(!showOptions)}><ArrowRightIcon /></button></span></h3>
                {showOptions && <div className="options">
                    <button onClick={() => setShowOptions(false)}>Popularity</button>
                    <button onClick={() => setShowOptions(false)}>Price: High to Low</button>
                    <button onClick={() => setShowOptions(false)}>Price: Low to High</button>
                    <button onClick={() => setShowOptions(false)}>Date</button>
                    <button onClick={() => setShowOptions(false)}>Ratings</button>
                </div>}
            </div>
        </div>
    )
}

export default ProductTitle