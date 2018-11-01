const validator = require('validator');
const isEmpty = require('./is_empty');
const _ = require('lodash');

module.exports = (data) => {
    /*Comment data:
        text -  string, required, max=150
    */
    const errors = {};
    let { text } = _.pick(data, ['text']);

    text = !isEmpty(text) ? text : '';

    /*TEXT*/
    if (isEmpty(text)) errors.text = 'متن کامنت نمیتواند خالی باشد';
    else {
        if (!validator.isLength(text, { max: 250 })) errors.text = 'متن کامنت نمیتواند بش از 150 حرف باشد';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};