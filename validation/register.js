const validator = require('validator');
const isEmpty = require('./is_empty');
const _ = require('lodash');

module.exports = (data) => {
    /*Register data:
        name - string, required, min=2, max:40
        email - string, required, max=255
        password - string, required, min=8, max=20
    */
    const errors = {};
    let { name, email, password, passwordConfirm } = _.pick(data, ['name', 'email', 'password', 'passwordConfirm']);

    name = !isEmpty(name) ? name : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';
    passwordConfirm = !isEmpty(passwordConfirm) ? passwordConfirm : '';


    /*NAME*/
    if (isEmpty(name)) errors.name = 'نام نمیتواند خالی باشد';
    else {
        const nameRex = /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z ]*$/;

        if (!nameRex.test(name)) {
            errors.name = 'نام نمیتواند شامل اعداد باشد ';
        } else {
            if (!validator.isLength(name, { min: 2, max: 40 }))
                errors.name = 'نام باید بین 2 تا 40 حرف باشد ';
        }
    }

    /*EMAIL*/
    if (isEmpty(email)) errors.email = 'ایمیل نمیتواند خالی باشد';
    else {
        if (!validator.isEmail(email)) errors.email = 'فرمت ایمیل وارد شده صحیح نمیباشد';
    }

    /*PASSWORD*/
    if (isEmpty(password)) errors.password = 'پسورد نمیتواند خالی باشد';
    else {
        if (!validator.isLength(password, { min: 8, max: 20 })) errors.password = 'پسورد باید بین 8 تا 20 کارکتر باشد';
    }

    /*PASSWORD_CONFRIM*/
    if (isEmpty(passwordConfirm)) errors.passwordConfirm = 'تایید گذرواژه نمیتواند خالی باشد';
    else {
        if (password !== passwordConfirm) {
            errors.password = 'پسورد و تایید پسورد مطابقت ندارند';
            errors.passwordConfirm = 'پسورد و تایید پسورد مطابقت ندارند';
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

};