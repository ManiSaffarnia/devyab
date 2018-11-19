import React from 'react'
import Comment from './Comment';

const CommentList = (props) => {
    return (
        <div className="comments">
            {props.comments.map((comment, index) => {
                return <Comment comment={comment} key={index} />
            })}
        </div>
    )
}

export default CommentList;
