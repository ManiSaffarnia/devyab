import isEmpty from '../validation/isEmpty';

const postDefaultState = {
    post: {},
    posts: [],
    loading: false
}

const postReducer = (state = postDefaultState, action) => {
    switch (action.type) {
        case 'POST_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'ADD_POST':
            return {
                ...state,
                posts: [action.data, ...state.posts],
                loading: false
            };
        case 'LIKE_POST':
            return {
                ...state,
                post: (isEmpty(state.post) ? state.post : ({ ...state.post, likes: [...state.post.likes, { user: action.data.userID }] })),
                posts: state.posts.map((post) => (post._id === action.data.postID) ? ({ ...post, likes: [...post.likes, { user: action.data.userID }] }) : (post)),
                loading: false
            };
        case 'UNLIKE_POST':
            return {
                ...state,
                post: (isEmpty(state.post) ? state.post : ({ ...state.post, likes: state.post.likes.filter((like) => (like.user !== action.data.userID)) })),
                posts: state.posts.map((post) => (post._id === action.data.postID) ? ({ ...post, likes: post.likes.filter((like) => (like.user !== action.data.userID)) }) : (post)),
                loading: false
            };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter((post) => {
                    return post._id !== action.data
                }),
                loading: false
            };
        case 'SET_A_POST':
            return {
                ...state,
                post: action.data,
                loading: false
            };
        case 'SET_ALL_POSTS':
            return {
                ...state,
                posts: action.data,
                loading: false
            };
        default:
            return state;
    }//end switch
};//end function

export default postReducer;