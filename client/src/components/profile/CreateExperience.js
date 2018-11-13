import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../form-component/TextFieldGroup';
import TextAreaFieldGroup from '../form-component/TextAreaFieldGroup';
import DatePickerGroup from '../form-component/DatePickerGroup';
import CheckboxGroup from '../form-component/CheckboxGroup';
import isEmpty from '../../validation/isEmpty';
import { experienceRealTimeValidation, experienceValidation } from '../../validation/experience';
import { createExperience } from '../../actions/profiles';

class CreateExperience extends Component {
    state = {
        title: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        errors: {}
    }

    //On Input Change handler
    onInputChangeHandler = (e) => {
        const inputFieldName = e.target.name;
        const inputData = e.target.value;

        if (inputFieldName === "current") {
            const element = document.getElementById('current').checked;
            this.setState({ current: element, endDate: '' });
        }
        else {
            //set state
            this.setState(() => ({ [inputFieldName]: inputData }));
        }

    };//End


    //on input's input event
    onInputInputHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        const { isValid, error } = experienceRealTimeValidation(inputFieldName, inputData);
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
        const { isValid, errors } = experienceValidation(this.state);
        if (!isValid) this.setState(() => ({ errors })); //validation error dashte

        else {
            const experience = {
                title: this.state.title,
                companyName: this.state.companyName,
                location: this.state.location,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                current: this.state.current,
                description: this.state.description,
            }
            this.props.createExperience(experience, this.props.history);
        }
    };//End


    render() {
        return (
            <div className="section add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-info">
                                <i className="fas fa-home"></i> Dashboard
                            </Link>
                            <h1 className="display-4 text-center">Add Your Experience</h1>
                            <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmitHandler} noValidate>

                                <TextFieldGroup
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="* Job Title"
                                    name="title"
                                    value={this.state.title}
                                    error={this.state.errors.title}
                                    onChange={this.onInputChangeHandler}
                                    onInput={this.onInputInputHandler}
                                />

                                <TextFieldGroup
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="* Company name"
                                    name="companyName"
                                    value={this.state.companyName}
                                    error={this.state.errors.companyName}
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

                                <h6>From Date</h6>
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
                                    onChange={this.onInputChangeHandler}
                                    error={this.state.errors.current}
                                    label="Current Job"
                                    htmlFor="current"
                                />

                                <TextAreaFieldGroup
                                    className="form-control form-control-lg"
                                    placeholder="Job Description"
                                    name="description"
                                    info="Some of your responsabilities in the company, etc"
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
    createExperience: (data, history) => { dispatch(createExperience(data, history)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateExperience);
