import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLogin, flashMessage } from '../../actions/auth';
import loginValidation from '../../validation/login';
import TextFieldGroup from '../form-component/TextFieldGroup';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {},
        flashMessage: this.props.location.state ? this.props.location.state.flashMessage : ''
    }

    //=============================================================================================================
    //LIFE CYCLE METHODS
    //=============================================================================================================
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState(() => ({ errors: nextProps.errors }));
        }
    }//END


    //=============================================================================================================
    //HANDLERS
    //=============================================================================================================
    onInputChangeHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        this.setState(() => (
            { [inputFieldName]: inputData }
        ));
    }//END


    //Flash Message handler 
    onFlashMessage = () => {
        if (this.state.flashMessage) {
            window.setTimeout(() => {
                this.closeFlashMessageHandler();
            }, 10000);
        }
    };//END


    closeFlashMessageHandler = () => {
        this.setState(() => ({ flashMessage: '' }));
    }



    onSubmitHandler = async (e) => {
        e.preventDefault();

        const input = { email: this.state.email, password: this.state.password };

        //client side validation
        const { isValid, errors } = loginValidation(input);

        if (!isValid) this.setState(() => ({ errors })); //validation error dashte
        else {
            //send to our server
            this.props.startLogin({ email: this.state.email, password: this.state.password }, this.props.history);
        }
    }//END

    //=============================================================================================================
    //RENDER
    //=============================================================================================================
    render() {
        if (this.state.flashMessage) {
            this.onFlashMessage();
        }

        return (
            <div className="login">
                <div className="container">

                    {this.state.flashMessage &&
                        <div className="row" id="flashMessage" style={{ justifyContent: "center" }}>
                            <div className="alert alert-info alert-dismissible fade show" style={{ transition: 'opacity 1s' }}>
                                <button type="button" className="close" id="close" data-dismiss="alert" onClick={this.closeFlashMessageHandler}>&times;</button>
                                <strong>Info!</strong> {this.state.flashMessage}.
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmitHandler} noValidate>
                                <TextFieldGroup
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="form-control form-control-lg"
                                    value={this.state.email}
                                    onChange={this.onInputChangeHandler}
                                    error={this.state.errors.email}
                                />

                                <TextFieldGroup
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control form-control-lg"
                                    value={this.state.password}
                                    onChange={this.onInputChangeHandler}
                                    error={this.state.errors.password}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }//END RENDER


}//END COMPONENT


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


const mapDispatchToProps = (dispatch) => ({
    startLogin: (data, history) => dispatch(startLogin(data, history)),
    flashMessage: (data) => dispatch(flashMessage(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);