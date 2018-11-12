const profileDefaultState = {
    profile: null,
    profiles: [],
    loading: false
}

const profileReducer = (state = profileDefaultState, action) => {
    switch (action.type) {
        case 'PROFILE':
            return console.log('profile reducer');
        case 'GET_CURRENT_USER_PROFILE':
            return {
                ...state,
                profile: action.data
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                loading: !state.loading
            };
        default:
            return state;
    }//end switch
};//end function

export default profileReducer;