import isEmpty from './isEmpty';
import axios from 'axios';

export const profileValidation = async ({ handle, jobStatus, skills }, profileHandler) => {
    const errors = {};

    //HANDLE
    if (isEmpty(handle)) errors.handle = 'Profile Handle field is required';
    else {
        try {
            const result = await axios.get(`api/profiles/handle/${handle}`)
            if (!isEmpty(result.data) && profileHandler && profileHandler.handle !== handle) {
                errors.handle = "This handle already exist, Please choose another handle for your profile.";
            }
        }
        catch (ex) {
            if (ex.response.status !== 404 && ex.response.data) {
                console.log(ex.response.date);

            }
        }
    }

    //JOBSTATUS
    if (isEmpty(jobStatus) || jobStatus === "0") errors.jobStatus = 'You should select a job status form the select list';

    //SKILLS
    if (isEmpty(skills)) errors.skills = 'Skills field is required, you should enter at least one skill';

    return {
        errors,
        isValid: isEmpty(errors)
    }
};//END



export const profileRealTimeValidation = (inputName, inputData) => {
    const error = {};

    //HANDLE
    if (inputName === 'handle') {
        if (inputData.trim().length > 40 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.handle = 'Handle length could be between 2-40 characters';
    }

    if (inputName === 'jobStatus') {
        if (inputData.trim().length > 30 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.handle = 'Handle length could be between 2-40 characters';
    }

    //SKILLS
    else if (inputName === 'skills') {
        const skillPattern = /^[a-zA-Z#+.0-9 ]+(,[a-zA-Z#+.0-9 ]+)*/
        if (!skillPattern.test(inputData)) error.skills = 'Skills should be comma seperator. eg. HTML,CSS,React ';
    }

    //SOCIAL MEDIA & WEBSITE
    else if (inputName === 'youtube' || inputName === 'facebook' || inputName === 'twitter' || inputName === 'linkedin' || inputName === 'instagram' || inputName === 'website') {
        const urlPattern = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
        if (!urlPattern.test(inputData) && inputData.trim().length > 0) error[inputName] = `${inputData} does not seem to be a valid link`;
    }

    //COMPANY
    else if (inputName === 'company') {
        if (inputData.trim().length > 60 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.company = 'Company name should be between 2-60 characters';
    }

    //LOCATION
    else if (inputName === 'location') {
        if (inputData.trim().length > 100 || (inputData.trim().length < 2 && inputData.trim().length > 0)) error.location = 'Location should be between 2-100 characters';
    }

    //BIO
    else if (inputName === 'bio') {
        if (inputData.trim().length > 350) error.bio = 'Biography can not be more than 350 character';
    }


    return {
        error,
        isValid: isEmpty(error)
    }
};//END