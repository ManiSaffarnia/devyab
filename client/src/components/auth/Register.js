import React, { Component } from 'react'
import { connect } from 'react-redux';
import { startRegister } from '../../actions/auth';

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
        this.setState(() => (
            { [inputFieldName]: inputData }
        ));
    }//End


    //On Submit Handler
    onSubmitHandler = async (e) => {
        e.preventDefault();

        //clientSide validation

        //create new user
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
        }

        //send to our server
        this.props.startRegister(newUser, this.props.history);
    }//End


    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevYab account</p>
                            <form onSubmit={this.onSubmitHandler} noValidate>
                                <div className="form-group">
                                    <input type="text" onChange={this.onInputChangeHandler} className={(!this.state.errors.name ? "form-control form-control-lg" : "form-control form-control-lg is-invalid")} placeholder="Name" name="name" value={this.state.name} />
                                    {this.state.errors.name && <div className="invalid-feedback">{this.state.errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="email" onChange={this.onInputChangeHandler} className={!this.state.errors.email ? "form-control form-control-lg" : "is-invalid form-control form-control-lg"} placeholder="Email Address" name="email" value={this.state.email} />
                                    {this.state.errors.email && <div className="invalid-feedback">{this.state.errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.onInputChangeHandler} className={!this.state.errors.password ? "form-control form-control-lg" : "is-invalid form-control form-control-lg"} placeholder="Password" name="password" value={this.state.password} />
                                    {this.state.errors.password && <div className="invalid-feedback">{this.state.errors.password}</div>}
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.onInputChangeHandler} className={!this.state.errors.passwordConfirm ? "form-control form-control-lg" : "is-invalid form-control form-control-lg"} placeholder="Confirm Password" name="passwordConfirm" value={this.state.passwordConfirm} />
                                    {this.state.errors.passwordConfirm && <div className="invalid-feedback">{this.state.errors.passwordConfirm}</div>}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }//END RENDER


}//END COMPONENT


//mapStateToProps
const mapStateToProps = (state) => ({
    errors: state.errors.errorMessage
});

//mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
    startRegister: (data, history) => dispatch(startRegister(data, history))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
