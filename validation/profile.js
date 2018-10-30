const validator = require('validator');
const isEmpty = require('./is_empty');
const _ = require('lodash');
const objectId = require('mongoose').Types.ObjectId;

const profileValidation = (data) => {
    /*Profile:
        user - objectID, required, valid
        handle - string, required, min=2, max=40
        jobStatus - string, required
        skills - string, required

        //if exist
        company - string, min=2, max=60
        location - string, min=2, max=255
        bio - string
        github

    */
    let { user, handle, company, location, jobStatus, skills, bio, github, youtube, instagram, twitter, facebook, linkedin } = data;
    const errors = {};

    user = !isEmpty(user) ? user : '';
    handle = !isEmpty(handle) ? handle : '';
    jobStatus = !isEmpty(jobStatus) ? jobStatus : '';
    skills = !isEmpty(skills) ? skills : '';


    /*USER*/
    if (isEmpty(user)) errors.user = 'یوزر آیدی کاربر فرستاده نشده است';
    else {
        if (!objectId.isValid(user)) errors.user = 'ابجکت ایدی فرستاده شده معتبر نیست';
    }


    /*handle*/
    if (isEmpty(handle)) errors.handle = 'هندل نمیتواند خالی باشد';
    else {
        if (!validator.isLength(handle, { min: 2, max: 40 })) {
            errors.handle = 'هندل باید مقداری بین 2 تا 40 کارتر داشته باشد';
        }
    }


    /*JOBSTATUS*/
    if (isEmpty(jobStatus)) errors.jobStatus = 'وضعیت شغلی نمیتواند خالی باشد';


    /*SKILLS*/
    if (isEmpty(skills)) errors.skills = 'مهارتها نمیتواند خالی باشد';
    else {
        const skillPattern = /^[a-zA-Z#+.0-9 ]+(,[a-zA-Z#+.0-9 ]+)*/
        if (!skillPattern.test(skills)) errors.skills = 'فرمت مهارتهای وارد شده صحیح نمیباشد';
    }

    /*COMPANY*/
    if (!isEmpty(company)) {
        const companyRex = /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z0-9 $()&+]*$/;
        if (!validator.isLength(company, { min: 2, max: 60 })) errors.company = 'نام شرکت میباید بین 2 تا 60 حرف باشد';
        if (!companyRex.test(company)) errors.company = 'نام شرکت غیرقابل قبول است';
    }

    /*LOCATION*/
    if (!isEmpty(company)) {
        if (!validator.isLength(location, { min: 2, max: 100 })) errors.company = 'موقعیت مکانی میباید بین 2 تا 100 حرف باشد';
    }

    /*SOCIALS*/
    if (!isEmpty(youtube)) { //agar khali nabood hala bayad check konim
        if (!validator.isURL(youtube)) errors.youtube = 'لینک یوتوب فرمت درستی ندارد'
    }
    if (!isEmpty(linkedin)) { //agar khali nabood hala bayad check konim
        if (!validator.isURL(linkedin)) errors.linkedin = 'لینک لینکدین فرمت درستی ندارد'
    }
    if (!isEmpty(facebook)) { //agar khali nabood hala bayad check konim
        if (!validator.isURL(facebook)) errors.facebook = 'لینک فیسبوک فرمت درستی ندارد'
    }
    if (!isEmpty(twitter)) { //agar khali nabood hala bayad check konim
        if (!validator.isURL(twitter)) errors.twitter = 'لینک توییتر فرمت درستی ندارد'
    }
    if (!isEmpty(instagram)) { //agar khali nabood hala bayad check konim
        if (!validator.isURL(instagram)) errors.instagram = 'لینک اینستاگرام فرمت درستی ندارد'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};


const createProfileData = (input) => {
    const newProfileData = {};
    newProfileData.user = input.user;
    if (input.handle) newProfileData.handle = input.handle;
    if (input.company) newProfileData.company = input.company;
    if (input.location) newProfileData.location = input.location;
    if (input.jobStatus) newProfileData.jobStatus = input.jobStatus;
    if (input.skills) newProfileData.skills = input.skills.split(',');//comma seperated string turn into array of string
    if (input.bio) newProfileData.bio = input.bio;
    if (input.github) newProfileData.github = input.github;
    newProfileData.social = {};
    if (input.youtube) newProfileData.social.youtube = input.youtube;
    if (input.facebook) newProfileData.social.facebook = input.facebook;
    if (input.instagram) newProfileData.social.instagram = input.instagram;
    if (input.twitter) newProfileData.social.twitter = input.twitter;
    if (input.linkedin) newProfileData.social.linkedin = input.linkedin;

    return newProfileData;
}

module.exports = {
    createProfileData,
    profileValidation
}