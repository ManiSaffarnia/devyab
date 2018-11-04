import axios from 'axios';
import { setErrors } from './errors';
import setAuthToken from '../utils/setAuthToken';

export const startRegister = ({ name = '', email = '', password = '', passwordConfirm = '' } = {}, history) => {


    return async (dispatch) => {
        const newUser = {
            name,
            email,
            password,
            passwordConfirm
        };

        try {
            const result = await axios.post('/api/users/register', newUser);

            if (result.status === 200) {
                history.push('/login');
            }
        }
        catch (ex) {
            dispatch(setErrors(ex.response.data)); //dispatch mikonim be error
        }
    }
}//End


//SET USER action generator
export const setUser = (user) => ({
    type: 'REGISTER',
    user
});//END


//REGISTER action generator
export const registerAction = (user) => ({
    type: 'REGISTER',
    user
});//END



//start Login
export const startLogin = ({ email = '', password = '' } = {}) => {
    return async (dispatch) => {
        try {
            const result = await axios.post('/api/users/login', { email, password });
            if (result.status === 200) {
                console.log(result.data);

                const token = result.headers["x-auth-token"];

                //save token in localstorage
                localStorage.setItem('jwtToken-devyab', token);

                //set token in each request header
                setAuthToken(token);


                //decode the token
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                const decodedUser = JSON.parse(window.atob(base64));


                //fill user in stor with logged in user
                dispatch(loginUser(decodedUser));
            }
        }
        catch (ex) {
            //dispatch mikonim be error
            dispatch(setErrors(ex.response.data));
        }
    }
}//END


//LOGIN action generator
export const loginUser = (user) => ({
    type: 'SET_LOGIN_USER',
    user
});//END