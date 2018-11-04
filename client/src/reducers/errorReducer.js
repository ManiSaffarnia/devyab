const errorDefaultState = {}

const errorReducer = (state = errorDefaultState, action) => {
    switch (action.type) {
        case 'SET_ERRORS':
            return ({
                ...action.errors
            });
        default:
            return state;
    }//end switch
};//end function

export default errorReducer;