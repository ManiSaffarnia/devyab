const validator = require('validator');
const isEmpty = require('./is_empty');
const _ = require('lodash');

module.exports = (data) => {
    /*Posts data:
        text -  string, required, max=250
    */
    const errors = {};
    let { text } = _.pick(data, ['text']);

    text = !isEmpty(text) ? text : '';

    /*TEXT*/
    if (isEmpty(text)) errors.text = 'متن پست نمیتواند خالی باشد';
    else {
        if (!validator.isLength(text, { max: 250 })) errors.text = 'متن پست نمیتواند بیش از 250 حرف باشد';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};