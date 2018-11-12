import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import TextFieldGroup from '../form-component/TextFieldGroup';
import TextAreaFieldGroup from '../form-component/TextAreaFieldGroup';
import isEmpty from '../../validation/isEmpty';

class CreateEducation extends Component {

    state = {
        schoolName: '',
        degree: '',
        fieldofstudy: '',
        description: '',
        errors: {}
    }

    //On Input Change handler
    onInputChangeHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        //set state
        this.setState(() => ({ [inputFieldName]: inputData }));
    };//End


    //on input's input event
    onInputInputHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        // const { isValid, error } = profileRealTimeValidation(inputFieldName, inputData);
        // if (!isValid) this.setState((preState) => ({ errors: { ...preState.errors, ...error } }));
        // else {
        //     this.setState((preState) => {
        //         const clearedError = { ...preState.errors };
        //         delete clearedError[inputFieldName];
        //         return {
        //             errors: { ...clearedError }
        //         }
        //     })

        // }
    };//END 


    //On Submit Handler
    onSubmitHandler = async (e) => {
        e.preventDefault();
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
                                    name="schoolName"
                                    value={this.state.school}
                                    error={this.state.errors.school}
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
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    error={this.state.errors.fieldofstudy}
                                    onChange={this.onInputChangeHandler}
                                    onInput={this.onInputInputHandler}
                                />

                                <h6>From Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="from" />
                                </div>
                                <h6>To Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="to" />
                                </div>
                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" name="current" value="" id="current" />
                                    <label className="form-check-label" htmlFor="current">
                                        Current Job
                                    </label>
                                </div>

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


export default CreateEducation;