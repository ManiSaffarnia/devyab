import isEmpty from './isEmpty';
//import axios from 'axios';

export const registerValidation = ({ name, email, password, passwordConfirm }) => {
    const errors = {};

    //NAME
    if (isEmpty(name)) errors.name = 'Name field is required';
    else if (name.trim().length > 30 || name.trim().length < 2) errors.name = 'Name length could be between 2-30 characters';

    //EMAIL
    if (isEmpty(email)) errors.email = 'Email field is required';
    else if (!email.trim().match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/)) errors.email = 'Email is not valid';

    //PASSWORD
    if (isEmpty(password)) errors.password = 'Password field is required';
    else if (password.length > 16 || password.length < 8) errors.password = 'Password must be between 8-16 characters';

    //PASSWORD CONFIRM
    if (isEmpty(passwordConfirm)) errors.passwordConfirm = 'Password confirmation field is required';
    else if (passwordConfirm !== password) errors.passwordConfirm = 'password and confirmation password in not match';

    return {
        errors,
        isValid: isEmpty(errors)
    }
};


export const registerRealTimeValidation = (inputName, inputData, password) => {
    const error = {};

    //NAME

    if (inputName === 'name') {

        if (inputData.trim().length > 30 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.name = 'Name length could be between 2-30 characters';
    }

    //EMAIL
    else if (inputName === 'email') {
        const emailRex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/;
        if (!emailRex.test(String(inputData).toLowerCase())) error.email = 'Email is not valid';
    }

    //PASSWORD
    else if (inputName === 'password') {
        if (inputData.length > 16 || (inputData.length < 8 && inputData.length > 0)) error.password = 'Password must be between 8-16 characters';
    }
    //PASSWORD CONFIRM
    else if (inputName === 'passwordConfirm') {
        if (inputData !== password) error.passwordConfirm = 'password and confirmation password in not match';
    }

    return {
        error,
        isValid: isEmpty(error)
    }
};