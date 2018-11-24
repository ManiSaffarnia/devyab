import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startAddLike, startRemoveLike, startDeletePost } from '../../actions/posts';
import { Link } from 'react-router-dom';
const moment = require('moment');




class PostItem extends Component {

    state = {
        isLiked: false
    }


    componentDidMount() {
        const isLiked = this.props.post.likes.filter((like) => like.user === this.props.auth.id);
        if (isLiked.length !== 0) this.setState(() => ({ isLiked: true }));
    }


    //LIKE
    likeHandler = () => {
        if (!this.state.isLiked) {
            this.setState(() => ({ isLiked: true }));
            this.props.addLike(this.props.post._id, this.props.auth.id);
        }
        else {
            this.setState(() => ({ isLiked: false }));
            this.props.removeLike(this.props.post._id, this.props.auth.id);
        }
    };


    //DISLIKE - TODO
    // dislikeHandler = () => {

    // };


    //DELETE
    onDeleteButtonClickedHandler = (e) => {
        if (window.confirm('Are you sure about deleting This post?')) this.props.deletePost(this.props.post._id);
    };


    render() {
        const { post, auth } = this.props;

        return (
            <div className="blog-container">

                <div className="blog-header">
                    <div className="blog-author--no-cover">
                        <div>
                            <h3><div style={{ backgroundImage: `url(${post.user.avatar ? post.user.avatar.replace(/\\/g, "/") : '../img/default-profile1.png'})` }}></div>{post.user.name}
                            </h3>
                        </div>
                        {(auth.id === post.user.id) &&
                            <div>
                                <button className="blog-button" style={{ marginTop: "20px" }} onClick={this.onDeleteButtonClickedHandler}><i className="fas fa-times"></i></button>
                            </div>
                        }

                    </div>
                </div>

                <div className="blog-body">
                    <div className="blog-summary">
                        <p>{post.text.length > 60 ? (post.text.substring(0, 59) + "... ") : (post.text)}{post.text.length > 60 && <Link to={`/feed/${post._id}`}>read more</Link>}</p>
                    </div>

                </div>

                <div className="blog-footer">
                    <ul>
                        <li className="published-date">{moment(post.date).fromNow()}</li>
                        {/**COMMENT */}
                        <li className="comments"><button className="blog-button"><i className="fas fa-comments" style={{ marginRight: "1px" }}></i><Link to={`/feed/${post._id}`}>{post.comment.length > 1 ? "comments" : "comment"} {post.comment.length}</Link></button></li>


                        {/**LIKE */}
                        <li className="shares"><button className={this.state.isLiked ? "blog-button-liked" : "blog-button"} onClick={this.likeHandler}><i className="fas fa-heart" style={{ marginRight: "1px" }}></i>{this.props.post.likes.length > 1 ? "likes" : "like"} {this.props.post.likes.length}</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth.user,
    posts: state.posts.posts,
    isLoading: state.posts.loading
})
const mapDispatchToProps = (dispatch) => ({
    addLike: (postID, userID) => { dispatch(startAddLike(postID, userID)) },
    removeLike: (postID, userID) => { dispatch(startRemoveLike(postID, userID)) },
    deletePost: (postID) => { dispatch(startDeletePost(postID)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(PostItem);