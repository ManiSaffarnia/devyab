import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startDeleteComment } from '../../actions/posts';
const moment = require('moment');

class Comment extends Component {

    onDeleteCommentHandler = () => {
        const data = {
            postID: this.props.post._id,
            commentID: this.props.comment._id
        }
        this.props.deleteComment(data);
    }

    render() {
        const { text, date } = this.props.comment;
        const { name, avatar } = this.props.comment.user;

        return (
            <div className="comment-container">

                <div className="comment-header">
                    <div className="comment-author--no-cover">
                        <div>
                            <h4><div style={{ backgroundImage: `url(${avatar ? avatar : '../img/default-profile1.png'})` }}></div>{name}</h4>
                            <small>{moment(date).fromNow()}</small>
                        </div>

                        {
                            (this.props.comment.user.id.toString() === this.props.auth.id.toString())
                            &&
                            (
                                <div>
                                    <button className="blog-button" style={{ marginTop: "20px" }} onClick={this.onDeleteCommentHandler}><i className="fas fa-times"></i></button>
                                </div>
                            )
                        }

                    </div>
                </div>

                <div className="comment-body">
                    <div className="comment-summary">
                        <p>{text}</p>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth.user,
    post: state.posts.post,
    isLoading: state.posts.loading
});

const mapDispatchToProps = (dispatch) => ({
    deleteComment: (data) => { dispatch(startDeleteComment(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
