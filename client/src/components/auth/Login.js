import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';

class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
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
    }//end OnInputChanged

    onSubmitHandler = async (e) => {
        e.preventDefault();

        //client side validation

        //send to our server

        this.props.startLogin({ email: this.state.email, password: this.state.password }, this.props.history);
    }//end onSubmit


    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmitHandler} noValidate>
                                <div className="form-group">
                                    <input type="email" onChange={this.onInputChangeHandler} className={!this.state.errors.email ? "form-control form-control-lg" : "is-invalid form-control form-control-lg"} placeholder="Email Address" name="email" />
                                    {this.state.errors.email && <div className="invalid-feedback">{this.state.errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.onInputChangeHandler} className={!this.state.errors.password ? "form-control form-control-lg" : "is-invalid form-control form-control-lg"} placeholder="Password" name="password" />
                                    {this.state.errors.password && <div className="invalid-feedback">{this.state.errors.password}</div>}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }//END RENDER



}//END


const mapStateToProps = (state) => ({
    errors: state.errors
});


const mapDispatchToProps = (dispatch) => ({
    startLogin: (data, history) => dispatch(startLogin(data, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);