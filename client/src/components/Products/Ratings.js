import Rating from '@mui/material/Rating'

const Ratings = ({ value }) => {
    return (
        <div className="ratings">
            <Rating 
                name="read-only" value={value} readOnly 
            />
        </div>
    )
}

export default Ratings
