const validator = require('validator');
const isEmpty = require('./is_empty');
const _ = require('lodash');
const objectId = require('mongoose').Types.ObjectId;
module.exports = (data) => {
    /*Experience data:
        title - string, required, min=2, max:40
        companyName - string, required, max=255
        location - string, required, min=2, max=30
        startDate - date, required
        endDate - date
        current - boolean, default=false
        description - string
    */
    const errors = {};
    let { userID, title, companyName, location, startDate, endDate, current, description } = _.pick(data, ['userID', 'title', 'companyName', 'location', 'startDate', 'endDate', 'current', 'description']);

    title = !isEmpty(title) ? title : '';
    companyName = !isEmpty(companyName) ? companyName : '';
    location = !isEmpty(location) ? location : '';
    startDate = !isEmpty(startDate) ? startDate : '';


    /*userID*/
    if (isEmpty(userID)) errors.userID = 'ایدی ارسال نشده است';
    else {
        if (!objectId.isValid(userID)) errors.name = 'آیدی ارسال شده معتبر نیست';
    }

    /*TITLE*/
    if (isEmpty(title)) errors.title = 'عنوان شغلی نمیتواند خالی باشد. یک عنوان ذکر کنید';
    else {
        if (!validator.isLength(title, { min: 2, max: 40 })) errors.title = 'عنوان شغلی باید بین 2 تا 40 کارکتر باشد';
    }

    /*COMPANY NAME*/
    if (isEmpty(companyName)) errors.companyName = 'نام شرکت نمیتواند خالی باشد';

    /*COMPANY NAME*/
    if (isEmpty(location)) errors.location = 'محل شرکت نمیتوان خالی باشد';

    /*STARTING DATE*/
    if (isEmpty(startDate)) errors.startDate = 'تاریخ شروع شغل نمیتواد خالی باشد';



    return {
        errors,
        isValid: isEmpty(errors)
    }

};