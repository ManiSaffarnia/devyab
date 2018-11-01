const validator = require('validator');
const isEmpty = require('./is_empty');
const _ = require('lodash');
const objectId = require('mongoose').Types.ObjectId;
module.exports = (data) => {
    /*Education data:
        schoolTitle - string, required, min=2, max:60
        degree - string, required, max=50
        fieldOfStudy - string, required, max=50
        GPA - Number, required
        location - string
        startDate - date, required
        endDate - date
        current - boolean, default=false
        description - string
    */
    const errors = {};
    let { userID, schoolTitle, degree, fieldOfStudy, GPA, location, startDate, endDate, current, description } = _.pick(data, ['userID', 'schoolTitle', 'degree', 'fieldOfStudy', 'GPA', 'location', 'startDate', 'endDate', 'current', 'description']);

    schoolTitle = !isEmpty(schoolTitle) ? schoolTitle : '';
    degree = !isEmpty(degree) ? degree : '';
    fieldOfStudy = !isEmpty(fieldOfStudy) ? fieldOfStudy : '';
    GPA = !isEmpty(GPA) ? GPA : '';
    location = !isEmpty(location) ? location : '';
    startDate = !isEmpty(startDate) ? startDate : '';


    /*userID*/
    if (isEmpty(userID)) errors.userID = 'ایدی ارسال نشده است';
    else {
        if (!objectId.isValid(userID)) errors.name = 'آیدی ارسال شده معتبر نیست';
    }

    /*SCHOOL TITLE*/
    if (isEmpty(schoolTitle)) errors.schoolTitle = 'نام موسسه آموزشی نمیتواند خالی باشد';
    else {
        if (!validator.isLength(schoolTitle, { min: 2, max: 60 })) errors.schoolTitle = 'نام موسسه آموزشی بین 2 تا 50 کارکتر میباید باشد';
    }

    /*DEGREE*/
    if (isEmpty(degree)) errors.degree = 'مقطع تحصیلی نمیتواند خالی باشد';

    /*FIELD OF STUDY*/
    if (isEmpty(fieldOfStudy)) errors.fieldOfStudy = 'رشته تحصیلی نمیتواند خالی باشد';

    /*GPA*/
    if (isEmpty(GPA)) errors.GPA = 'معدل نمیتواند خالی باشد';

    /*LOCATION*/
    if (isEmpty(location)) errors.location = 'محل تحصیل نمیتواند خالی باشد';

    /*STARTING DATE*/
    if (isEmpty(startDate)) errors.startDate = 'تاریخ شروع تحصیل نمیتواد خالی باشد';



    return {
        errors,
        isValid: isEmpty(errors)
    }

};