import axios from 'axios';
import { setErrors } from './errors';
import setAuthToken from '../utils/setAuthToken';
import { isLoading } from './profiles';

//start register a user
export const startRegister = ({ name = '', email = '', password = '', passwordConfirm = '' } = {}, history) => {
    return async (dispatch) => {
        dispatch(isLoading());
        const newUser = {
            name,
            email,
            password,
            passwordConfirm
        };

        try {
            //asynch request to server
            const result = await axios.post('/api/users/register', newUser);

            //OK response
            if (result.status === 200) {
                dispatch(isLoading());
                history.push({
                    pathname: '/login',
                    state: { flashMessage: 'Your account was created. Please verify your email first, and then login' }
                })
            }
        }
        catch (ex) {
            dispatch(isLoading());
            dispatch(setErrors({ errorMessage: ex.response.data })); //dispatch mikonim be error
            history.push({
                pathname: '/register',
                state: { flashMessage: 'Your account was created. Please verify your email first, and then login' }
            })
        }
    }
}//End


//SET USER action generator
export const setUser = (user) => ({
    type: 'REGISTER',
    user
});//END

//SET FLASH MESSAGE
export const flashMessage = (data) => ({
    type: 'SET_FLASH_MESSAGE',
    data
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
            dispatch(isLoading());
            const result = await axios.post('/api/users/login', { email, password });
            if (result.status === 200) {
                //console.log(result.data);

                const token = result.headers["x-auth-token"];

                //save token in localstorage
                localStorage.setItem('jwtToken-devyab', token);

                //set token in each request header
                setAuthToken(token);


                //decode the token
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                const decodedUser = JSON.parse(window.atob(base64));


                dispatch(isLoading());

                //fill user in stor with logged in user
                dispatch(loginUser(decodedUser));
            }
        }
        catch (ex) {
            //dispatch mikonim be error
            dispatch(isLoading());
            if (ex.response.data) dispatch(setErrors(ex.response.data));
            else {
                console.log(ex);
            }
        }
    }
}//END


//LOGIN action generator
export const loginUser = (user) => ({
    type: 'SET_LOGIN_USER',
    user
});//END



//===============================================================================================
//                                          LOGOUT
//===============================================================================================
//start logout user
export const startLogout = () => {
    //remove token form local storage
    localStorage.removeItem('jwtToken-devyab');

    //remove token from header
    setAuthToken();

    //dispatch to logout action
    return (dispatch) => {
        dispatch(logout());
    }
}//END


//logout User 
export const logout = () => ({
    type: 'LOGOUT'
});//END









// const options = {
//     // onUploadProgress: (progressEvent) => {

//     //     console.log(progressEvent);
//     //     let percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//     //     console.log("on upload = ", percentage);
//     // },
//     // onDownloadProgress: (progressEvent) => {
//     //     console.log(progressEvent);
//     //     let percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//     //     console.log("on download = ", percentage);
//     // }
// }