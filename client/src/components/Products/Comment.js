import React from 'react'
import Moment from 'react-moment'

// COMPONENTS
import Ratings from './Ratings'

// STYLE
import '../../styles/Comment.scss'

const Comment = ({ comment }) => {
    return (
        <div className='comment'>
            <div className="container">
                <div className="name">
                    <h2>{comment.user.firstName} {comment.user.firstName}</h2>
                </div>
                <div className="rating">
                    <Ratings value={comment.rating} />
                    <h3>{comment.rating}</h3>
                    <h4> <Moment format="MMM DD, YYYY">{comment.date}</Moment> </h4>                        
                </div>
                <div className="comment_msg">
                    <p>{comment.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment