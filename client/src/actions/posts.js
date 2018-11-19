import axios from 'axios';


//==============================================================================================
//                                          ADD POST
//==============================================================================================
export const startAddPost = (post) => {
    return async (dispatch) => {
        dispatch(postLoading()) //loading
        try {
            const result = await axios.post('/api/posts', post);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(AddNewPost(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                dispatch(AddNewPost({}));
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

export const AddNewPost = (data) => ({
    type: "ADD_POST",
    data
})

//==============================================================================================
//                                          FETCH ALL POSTS
//==============================================================================================
export const startFetchAllPosts = () => {
    return async (dispatch) => {
        dispatch(postLoading()) //loading
        try {
            const result = await axios.get('/api/posts');

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(setAllPosts(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                dispatch(setAllPosts([]));
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

export const setAllPosts = (data) => ({
    type: "SET_ALL_POSTS",
    data
});



//==============================================================================================
//                                          FETCH an unique POSTS
//==============================================================================================
export const startFetchUniquePost = (postID) => {
    return async (dispatch) => {
        dispatch(postLoading());
        try {
            const result = await axios.get(`/api/posts/${postID}`);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(SetPost(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                dispatch(SetPost({}));
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

export const SetPost = (data) => ({
    type: "SET_A_POST",
    data
});

//==============================================================================================
//                                     DELETE A POST
//==============================================================================================
export const startDeletePost = (postID) => {
    return async (dispatch) => {
        try {
            const result = await axios.delete(`/api/posts/${postID}`);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(deletePost(postID));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

export const deletePost = (data) => ({
    type: "DELETE_POST",
    data
});

//==============================================================================================
//                                       ADD LIKE
//==============================================================================================
export const startAddLike = (postID, userID) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(`/api/posts/like/${postID}`);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(addLike({ postID, userID }));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                //dispatch(SetPost({}));
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

export const addLike = (data) => ({
    type: "LIKE_POST",
    data
});

//==============================================================================================
//                                       Remove LIKE
//==============================================================================================
export const startRemoveLike = (postID, userID) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(`/api/posts/like/${postID}`);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(removeLike({ postID, userID }));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                //dispatch(SetPost({}));
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

export const removeLike = (data) => ({
    type: "UNLIKE_POST",
    data
});

//==============================================================================================
//                                       ADD COMMENT
//==============================================================================================
export const startAddComment = (data) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(`/api/posts/comment/${data.postID}`, data);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(SetPost(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                //dispatch(SetPost({}));
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

//==============================================================================================
//                                       DELETE COMMENT
//==============================================================================================
export const startDeleteComment = (data) => {
    return async (dispatch) => {
        try {
            const result = await axios.delete(`/api/posts/comment/${data.postID}/${data.commentID}`);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(SetPost(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                //dispatch(SetPost({}));
                //dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) console.log(ex.response.data);
        }
    }
};

//================================================================================================
//LOADING
export const postLoading = () => ({
    type: "POST_LOADING"
})