import isEmpty from './isEmpty';

export const experienceValidation = ({ title, companyName, location, startDate, endDate }) => {
    const errors = {};

    //TITLE
    if (isEmpty(title)) errors.title = 'Job title field is required';

    //COMPANY_NAME
    if (isEmpty(companyName)) errors.companyName = 'company name in required';

    //LOCATION
    if (isEmpty(location)) errors.location = 'location is required';

    //START DATR
    if (isEmpty(startDate)) errors.startDate = 'start date is required';

    //END DATE
    if (!isEmpty(endDate)) { //AGAR END DATE KHALI NABOOD ....
        const startDateVALUE = new Date(startDate);
        const endDateVALUE = new Date(endDate);
        //console.log("start date = ", startDateVALUE)
        //console.log("end date = ", endDateVALUE)
        if (startDateVALUE > endDateVALUE) errors.endDate = 'The end date of job could not be before the start date of it';
    }

    //console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    }
};//END



export const experienceRealTimeValidation = (inputName, inputData) => {
    const error = {};

    //TITLE
    if (inputName === 'title') {
        if (inputData.trim().length > 60 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.title = 'Job title length could be between 2-60 characters';
    }

    //COMPANY_NAME
    if (inputName === 'companyName') {
        if (inputData.trim().length > 60 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.companyName = 'Company name could be between 2-60 characters';
    }

    //LOCATION
    if (inputName === 'location') {
        if (inputData.trim().length > 40 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.location = 'Location could be between 2-40 characters';
    }

    //COMPANY
    else if (inputName === 'description') {
        if (inputData.trim().length > 250 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.description = 'description should be between 2-250 characters';
    }

    return {
        error,
        isValid: isEmpty(error)
    }
};//END