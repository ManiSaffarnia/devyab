import React, { Component } from 'react'
import { connect } from 'react-redux';
import PostForm from '../form-component/PostForm';
import { startAddPost } from '../../actions/posts';

class AddPost extends Component {

    onSubmit = (data) => {
        const newPost = {
            text: data.text,
            name: this.props.auth.name,
            avatar: this.props.auth.avatar,
        }
        this.props.addPost(newPost)
    }

    render() {
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm onSubmit={this.onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth.user
});
const mapDispatchToProps = (dispatch) => ({
    addPost: (data) => { dispatch(startAddPost(data)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
