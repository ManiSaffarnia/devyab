import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configStore from './store/storeConfig';
import authentication from './utils/authentication';
import { loginUser, logout } from './actions/auth';
import { startGetUserProfile } from './actions/profiles';
import Loading from './components/Loading';

//create an store
const store = configStore();

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);


//check for one time render
let isRender = false;

const renderApp = () => {
    if (!isRender) {
        ReactDOM.render(jsx, document.getElementById('root'));
        isRender = true;
    }
};


//LOADING PAGE
ReactDOM.render(<Loading />, document.getElementById('root'));


//auth process
const user = authentication(store);
console.log(user);
if (user) {
    store.dispatch(loginUser(user));
    store.dispatch(startGetUserProfile())
    console.log('Login');
    renderApp();
} else {
    store.dispatch(logout());
    console.log('logOUT');
    renderApp();
}