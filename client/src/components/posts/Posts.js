import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';
import PostForm from '../form-component/PostForm';
import { startAddPost, startFetchAllPosts } from '../../actions/posts';
import PostFeed from './PostFeed';

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    onSubmit = (data) => {
        const newPost = {
            text: data.text,
            name: this.props.auth.name,
            avatar: this.props.auth.avatar,
        }
        this.props.addPost(newPost);
    }

    render() {
        let jsx;
        if (this.props.posts === null || this.props.isLoading) jsx = <Loading />
        else jsx = (<PostFeed posts={this.props.posts} auth={this.props.auth} />)
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/**Post Form */}
                            <PostForm onSubmit={this.onSubmit} />

                            {/**Post Feed */}
                            {jsx}
                        </div>
                    </div>
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
    addPost: (data) => { dispatch(startAddPost(data)) },
    fetchPosts: () => { dispatch(startFetchAllPosts()) }
})
export default connect(mapStateToProps, mapDispatchToProps)(Posts);