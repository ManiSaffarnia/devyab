const validator = require('validator');
const isEmpty = require('./is_empty');
const _ = require('lodash');

module.exports = (data) => {
    /*Login data:
        email - string, required
        password - string, required
    */
    const errors = {};
    let { email, password } = _.pick(data, ['email', 'password']);

    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    /*EMAIL*/
    if (isEmpty(email)) errors.email = 'ایمیل نمیتواند خالی باشد';
    else {
        if (!validator.isEmail(email)) errors.email = 'فرمت ایمیل وارد شده صحیح نمیباشد';
    }

    /*PASSWORD*/
    if (isEmpty(password)) errors.password = 'پسورد نمیتواند خالی باشد';


    return {
        errors,
        isValid: isEmpty(errors)
    }

};