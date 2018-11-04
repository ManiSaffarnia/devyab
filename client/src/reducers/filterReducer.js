const filterDefaultState = {
    text: '',
    sortBy: 'alphabetic'
}

const filterReducer = (state = filterDefaultState, action) => {
    switch (action.type) {
        case 'FILTER':
            return console.log('filter reducer');
        default:
            return state;
    }//end switch
};//end function

export default filterReducer;