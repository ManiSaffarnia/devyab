import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../form-component/TextFieldGroup';
import TextAreaFieldGroup from '../form-component/TextAreaFieldGroup';
import DatePickerGroup from '../form-component/DatePickerGroup';
import CheckboxGroup from '../form-component/CheckboxGroup';
import isEmpty from '../../validation/isEmpty';
import { educationRealTimeValidation, educationValidation } from '../../validation/education';
import { createEducation } from '../../actions/profiles';

class CreateEducation extends Component {

    state = {
        schoolTitle: '',
        degree: '',
        fieldOfStudy: '',
        location: '',
        GPA: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        errors: {}
    }

    //On Input Change handler
    onInputChangeHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        this.setState(() => ({ [inputFieldName]: inputData }));
    };//End


    //On CheckBox CHECKED handler
    onCheckBoxCheked = (e) => {
        this.setState((preState) => ({ current: !preState.current, endDate: '' }));
    }


    //On GPA changed handler
    onGPAchangedHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        if (!inputData || inputData.match(/^\d{1,2}(\.\d{0,2})?$/)) {
            this.setState(() => ({ [inputFieldName]: inputData }));
        }
    }

    //on input's input event
    onInputInputHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        const { isValid, error } = educationRealTimeValidation(inputFieldName, inputData);
        if (!isValid) this.setState((preState) => ({ errors: { ...preState.errors, ...error } }));
        else {
            this.setState((preState) => {
                const clearedError = { ...preState.errors };
                delete clearedError[inputFieldName];
                return {
                    errors: { ...clearedError }
                }
            })

        }
    };//END 


    //On Submit Handler
    onSubmitHandler = async (e) => {
        e.preventDefault();

        //validation
        const { isValid, errors } = educationValidation(this.state);
        if (!isValid) this.setState(() => ({ errors })); //validation error dashte
        else {
            const education = {
                schoolTitle: this.state.schoolTitle,
                degree: this.state.degree,
                fieldOfStudy: this.state.fieldOfStudy,
                location: this.state.location,
                GPA: parseFloat(this.state.GPA),
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                current: this.state.current,
                description: this.state.description,
            }
            this.props.createEducation(education, this.props.history);
        }


        console.log(this.state);

    };//End



    render() {
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-info">
                                <i className="fas fa-home"></i> Dashboard
                            </Link>
                            <h1 className="display-4 text-center">Add Your Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <small className="d-block pb-3">Fields with * are required</small>
                            <form onSubmit={this.onSubmitHandler} noValidate>

                                <TextFieldGroup
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="* School Or Bootcamp"
                                    name="schoolTitle"
                                    value={this.state.schoolTitle}
                                    error={this.state.errors.schoolTitle}
                                    onChange={this.onInputChangeHandler}
                                    onInput={this.onInputInputHandler}
                                />

                                <TextFieldGroup
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="* Degree Or Certificate"
                                    name="degree"
                                    value={this.state.degree}
                                    error={this.state.errors.degree}
                                    onChange={this.onInputChangeHandler}
                                    onInput={this.onInputInputHandler}
                                />

                                <TextFieldGroup
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Field Of Study"
                                    name="fieldOfStudy"
                                    value={this.state.fieldOfStudy}
                                    error={this.state.errors.fieldOfStudy}
                                    onChange={this.onInputChangeHandler}
                                    onInput={this.onInputInputHandler}
                                />

                                <TextFieldGroup
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    error={this.state.errors.location}
                                    onChange={this.onInputChangeHandler}
                                    onInput={this.onInputInputHandler}
                                />

                                <TextFieldGroup
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="* GPA"
                                    name="GPA"
                                    info="You should enter a number, eg. 18.45"
                                    value={this.state.GPA}
                                    error={this.state.errors.GPA}
                                    onChange={this.onGPAchangedHandler}
                                    onInput={this.onInputInputHandler}
                                />


                                <h6>* From Date</h6>
                                <DatePickerGroup
                                    className="form-control form-control-lg"
                                    name="startDate"
                                    value={this.state.startDate}
                                    onChange={this.onInputChangeHandler}
                                    error={this.state.errors.startDate}
                                />

                                <h6>To Date</h6>
                                <DatePickerGroup
                                    className="form-control form-control-lg"
                                    name="endDate"
                                    value={this.state.endDate}
                                    onChange={this.onInputChangeHandler}
                                    error={this.state.errors.endDate}
                                    onInput={this.onInputInputHandler}
                                    disabled={this.state.current}
                                />


                                <CheckboxGroup
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    id="current"
                                    value={this.state.current}
                                    onChange={this.onCheckBoxCheked}
                                    error={this.state.errors.current}
                                    label="Current Job"
                                    htmlFor="current"
                                />

                                <TextAreaFieldGroup
                                    className="form-control form-control-lg"
                                    placeholder="Program Description"
                                    name="description"
                                    info="Tell us about your experience and what you learned"
                                    value={this.state.description}
                                    error={this.state.errors.description}
                                    onChange={this.onInputChangeHandler}
                                    onInput={this.onInputInputHandler}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" disabled={!isEmpty(this.state.errors)} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    createEducation: (data, history) => { dispatch(createEducation(data, history)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEducation);