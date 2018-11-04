const postDefaultState = {
    post: {},
    posts: [],
    loading: false
}

const postReducer = (state = postDefaultState, action) => {
    switch (action.type) {
        case 'POST':
            return console.log('post reducer');
        default:
            return state;
    }//end switch
};//end function

export default postReducer;