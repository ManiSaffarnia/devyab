const profileDefaultState = {
    profile: {},
    profiles: [],
    loading: false
}

const profileReducer = (state = profileDefaultState, action) => {
    switch (action.type) {
        case 'PROFILE':
            return console.log('profile reducer');
        default:
            return state;
    }//end switch
};//end function

export default profileReducer;