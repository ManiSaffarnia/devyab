const profileDefaultState = {
    profile: null,
    profiles: [],
    loading: false
}

const profileReducer = (state = profileDefaultState, action) => {
    switch (action.type) {
        case 'PROFILE':
            return console.log('profile reducer');
        case 'SET_CURRENT_USER_PROFILE':
            return {
                ...state,
                profile: action.data
            };
        default:
            return state;
    }//end switch
};//end function

export default profileReducer;