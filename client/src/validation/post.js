import isEmpty from './isEmpty';

export const postValidation = (text) => {
    const errors = {};

    if (isEmpty(text)) errors.text = "text field is required";
    else if (text.trim().length > 250) errors.text = "can not be more than 250 character"

    return {
        errors,
        isValid: isEmpty(errors)
    }
};//END

