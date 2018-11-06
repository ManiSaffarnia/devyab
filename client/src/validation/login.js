import isEmpty from './isEmpty';

const loginValidation = ({ email, password }) => {
    const errors = {};

    //EMAIL
    if (isEmpty(email)) errors.email = 'Email field is required';

    //PASSWORD
    if (isEmpty(password)) errors.password = 'Password field is required';

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

export default loginValidation;