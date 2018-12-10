const profileDefaultState = {
    profile: null,
    profiles: [],
    devProfile: null,
    loading: false
}

const profileReducer = (state = profileDefaultState, action) => {
    switch (action.type) {
        case 'PROFILE':
            return console.log('profile reducer');
        case 'GET_CURRENT_USER_PROFILE':
            return {
                ...state,
                profile: action.data,
                loading: false
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                loading: !state.loading
            };
        case 'SET_ALL_DEVELOPERS_PROFILE':
            return {
                ...state,
                profiles: action.data,
                loading: false
            };
        case 'SET_DEVELOPER_PROFILE_BY_HANDLE':
            return {
                ...state,
                devProfile: action.data,
                loading: false
            };
        default:
            return state;
    }//end switch
};//end function

export default profileReducer;