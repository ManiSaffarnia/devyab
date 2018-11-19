import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startFetchUniquePost, startAddComment, startAddLike, startRemoveLike } from '../../actions/posts';
import Loading from '../Loading';
import isEmpty from '../../validation/isEmpty';
import PostForm from '../form-component/PostForm';
import CommentList from './CommentList';

const moment = require('moment');

class Post extends Component {

    state = {
        isLiked: false
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postID);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.post)) {
            const isLiked = nextProps.post.likes.filter((like) => like.user === this.props.auth.id);
            if (isLiked.length !== 0) this.setState(() => ({ isLiked: true }));
        }
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

    //SUBMIT COMMETN
    onCommentSubmit = (data) => {
        const newPost = {
            text: data.text,
            name: this.props.auth.name,
            avatar: this.props.profile.user.avatar,
            postID: this.props.post._id,
        }
        this.props.addComment(newPost);
    }

    render() {
        const { post, auth } = this.props;
        let jsx;
        if (isEmpty(this.props.post) || this.props.isLoading) jsx = <Loading />
        else jsx = (
            <React.Fragment>
                {/**POST SECTION*/}
                <div className="blog-container">
                    <div className="blog-header">
                        <div className="blog-author--no-cover">
                            <div>
                                <h3><div style={{ backgroundImage: `url(${post.user.avatar ? post.user.avatar : '../img/default-profile1.png'})` }}></div>{post.user.name}</h3>
                            </div>
                            {
                                (auth.id === post.user.id)
                                &&
                                <div>
                                    <button className="blog-button" style={{ marginTop: "20px" }} onClick={this.onDeleteButtonClickedHandler}><i className="fas fa-times"></i></button>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="blog-body">
                        <div className="blog-summary">
                            <p>{post.text}</p>
                        </div>
                    </div>

                    <div className="blog-footer">
                        <ul>
                            <li className="published-date">{moment(post.date).fromNow()}</li>
                            {/**COMMENT */}
                            <li className="comments"><button className="blog-button"><i className="fas fa-comments" style={{ marginRight: "1px" }}></i>comment</button></li>

                            {/**LIKE */}
                            <li className="shares"><button className={this.state.isLiked ? "blog-button-liked" : "blog-button"} onClick={this.likeHandler}><i className="fas fa-heart" style={{ marginRight: "1px" }}></i>{this.props.post.likes.length > 1 ? "likes" : "like"} {this.props.post.likes.length}</button></li>
                        </ul>
                    </div>
                </div>


                {/**COMMET SECTION*/}
                <div className="comment-container">
                    {/**COMMET FORM */}
                    <PostForm onSubmit={this.onCommentSubmit} />

                    {/**COMMENT LSIT */}
                    <CommentList comments={this.props.comments} />
                </div>

            </React.Fragment>
        );


        return (
            <div className="post">
                {jsx}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth.user,
    post: state.posts.post,
    profile: state.profiles.profile,
    isLoading: state.posts.loading,
    comments: state.posts.post.comment
})
const mapDispatchToProps = (dispatch) => ({
    fetchPost: (postID) => { dispatch(startFetchUniquePost(postID)) },
    addComment: (data) => { dispatch(startAddComment(data)) },
    addLike: (postID, userID) => { dispatch(startAddLike(postID, userID)) },
    removeLike: (postID, userID) => { dispatch(startRemoveLike(postID, userID)) },
})
export default connect(mapStateToProps, mapDispatchToProps)(Post);
