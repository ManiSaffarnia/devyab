const authDefaultState = {
    user: {},
    isAuthenticated: false,
    flashMessage: ''
};

const authReducer = (state = authDefaultState, action) => {
    switch (action.type) {
        case 'REGISTER':
            return ({
                ...state,
                user: action.user
            });
        case 'SET_FLASH_MESSAGE':
            return ({
                ...state,
                flashMessage: action.data
            });
        case 'SET_LOGIN_USER':
            return ({
                ...state,
                user: action.user,
                isAuthenticated: action.user.id ? true : false
            });
        case 'LOGOUT':
            return ({
                ...state,
                isAuthenticated: false,
                user: {}
            });
        default:
            return state;
    }//end switch
};//end function

export default authReducer;