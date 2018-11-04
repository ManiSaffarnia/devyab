const authDefaultState = {
    user: {},
    isAuthenticated: false
}

const authReducer = (state = authDefaultState, action) => {
    switch (action.type) {
        case 'REGISTER':
            return ({
                ...state,
                user: action.user
            });
        case 'SET_LOGIN_USER':
            return ({
                ...state,
                user: action.user,
                isAuthenticated: action.user.id ? true : false
            });
        default:
            return state;
    }//end switch
};//end function

export default authReducer;