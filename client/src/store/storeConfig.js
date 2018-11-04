import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';
import filterReducer from '../reducers/filterReducer';
import postReducer from '../reducers/postReducer';
import profileReducer from '../reducers/profileReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            errors: errorReducer,
            auth: authReducer,
            profiles: profileReducer,
            posts: postReducer,
            filters: filterReducer
        }),
        composeEnhancer(applyMiddleware(thunk))
    );

    return store
};