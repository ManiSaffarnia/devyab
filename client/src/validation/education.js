import isEmpty from './isEmpty';

export const educationValidation = ({ schoolTitle, degree, fieldOfStudy, GPA, startDate, endDate, current }) => {
    const errors = {};

    //SCHOOL_TITLE
    if (isEmpty(schoolTitle)) errors.schoolTitle = 'School title field is required';

    //DEGREE
    if (isEmpty(degree)) errors.degree = 'degree is required';

    //FIELD_OF_STUDY
    if (isEmpty(fieldOfStudy)) errors.fieldOfStudy = 'Field of study is required';

    //GPA
    if (isEmpty(GPA)) errors.GPA = 'GPA is required';

    //START DATR
    if (isEmpty(startDate)) errors.startDate = 'start date is required';

    //END DATE
    if (!isEmpty(endDate)) { //AGAR END DATE KHALI NABOOD ....
        const startDateVALUE = new Date(startDate);
        const endDateVALUE = new Date(endDate);
        console.log("start date = ", startDateVALUE)
        console.log("end date = ", endDateVALUE)
        if (startDateVALUE > endDateVALUE) errors.endDate = 'The end date of job could not be before the start date of it';
    }

    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    }
};//END



export const educationRealTimeValidation = (inputName, inputData) => {
    const error = {};

    //SCHOOL_TITLE
    if (inputName === 'schoolTitle') {
        if (inputData.trim().length > 60 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.schoolTitle = 'School title field length could be between 2-60 characters';
    }

    //DEGREE
    if (inputName === 'degree') {
        if (inputData.trim().length > 60 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.degree = 'Degree field length could be between 2-60 characters';
    }

    //FIELD_OF_STUDY
    if (inputName === 'fieldOfStudy') {
        if (inputData.trim().length > 100 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.fieldOfStudy = 'Study field length could be between 2-100 characters';
    }

    //LOCATION
    if (inputName === 'location') {
        if (inputData.trim().length > 40 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.location = 'Location could be between 2-40 characters';
    }

    //DESCRIPTION
    else if (inputName === 'description') {
        if (inputData.trim().length > 250 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.description = 'description should be between 2-250 characters';
    }

    return {
        error,
        isValid: isEmpty(error)
    }
};//END