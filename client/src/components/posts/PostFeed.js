import React from 'react'
import PostItem from './PostItem';

const PostFeed = (props) => {
    console.log(props.posts);
    return (
        <div className="posts">
            {props.posts.map((post) => {
                return <PostItem key={post._id} post={post} auth={props.auth} />
            })}
        </div>
    )
}

export default PostFeed;
