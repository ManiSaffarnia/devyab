import React, { Component } from 'react'
import { connect } from 'react-redux';
import { startRegister } from '../../actions/auth';
import { registerValidation, registerRealTimeValidation } from '../../validation/register';
import isEmpty from '../../validation/isEmpty';
import TextFieldGroup from '../form-component/TextFieldGroup';

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        errors: {}
    }

    //life Cycle method
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState(() => ({ errors: nextProps.errors }));
        }
    }//END


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
        const { isValid, error } = registerRealTimeValidation(inputFieldName, inputData, this.state.password);
        if (!isValid) this.setState((preState) => ({ errors: { ...preState.errors, ...error } }));
        else {//validation passed
            this.setState((preState) => {
                const clearedError = { ...preState.errors };
                delete clearedError[inputFieldName];
                return {
                    errors: { ...clearedError }
                }
            })
        }
    };

    //On Submit Handler
    onSubmitHandler = async (e) => {
        e.preventDefault();

        //clientSide validation
        const { isValid, errors } = registerValidation(this.state);
        if (!isValid) this.setState(() => ({ errors })); //validation error dashte

        else { //validation passed

            //create new user
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm,
            }

            //send to our server
            this.props.startRegister(newUser, this.props.history);
        }

    };//End


    render() {
        return (<div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevYab account</p>
                        <form onSubmit={this.onSubmitHandler} noValidate>
                            <TextFieldGroup
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="form-control form-control-lg"
                                value={this.state.name}
                                error={this.state.errors.name}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <TextFieldGroup
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="form-control form-control-lg"
                                value={this.state.email}
                                error={this.state.errors.email}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <TextFieldGroup
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control form-control-lg"
                                value={this.state.password}
                                error={this.state.errors.password}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <TextFieldGroup
                                type="password"
                                name="passwordConfirm"
                                placeholder="Password Confirmation"
                                className="form-control form-control-lg"
                                value={this.state.passwordConfirm}
                                error={this.state.errors.passwordConfirm}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <input type="submit" className="btn btn-info btn-block mt-4" disabled={!isEmpty(this.state.errors)} />
                        </form>

                        {this.props.isLoading && (
                            <div className="myLoading">
                                <div className="spinnerContainer">
                                    <div className="mySpinner">
                                        <div className="sk-folding-cube">
                                            <div className="sk-cube1 sk-cube"></div>
                                            <div className="sk-cube2 sk-cube"></div>
                                            <div className="sk-cube4 sk-cube"></div>
                                            <div className="sk-cube3 sk-cube"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>);
    }//END RENDER


}//END COMPONENT


//mapStateToProps
const mapStateToProps = (state) => ({
    isLoading: state.profiles.loading,
    errors: state.errors.errorMessage
});

//mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
    startRegister: (data, history) => dispatch(startRegister(data, history))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
