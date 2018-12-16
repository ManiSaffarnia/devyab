import React from 'react'
import PostItem from './PostItem';

const PostFeed = (props) => {
    return (
        <div className="posts">
            {props.posts.length > 0 && props.posts.map((post) => {
                return <PostItem key={post._id} post={post} auth={props.auth} />
            })}

        </div>
    )
}

export default PostFeed;
