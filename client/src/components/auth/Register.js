import React, { Component } from 'react'
import axios from 'axios';

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        errors: {}
    }


    onInputChangeHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        this.setState(() => (
            { [inputFieldName]: inputData }
        ));
    }//end InputChange

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
        try {
            const result = await axios.post('/api/users/register', newUser);
            if (result.status === 200) {
                //reset inputs
                document.getElementsByName('name')[0].value = '';
                document.getElementsByName('email')[0].value = '';
                document.getElementsByName('password')[0].value = '';
                document.getElementsByName('passwordConfirm')[0].value = '';

                //show flash message

            }
        } catch (ex) {
            console.log("خوردیم به بشکه! : ", ex.response);
            //show error
            const { errorMessage } = ex.response.data
            if (errorMessage) { //yani validation error dashtim
                this.setState(() => ({ errors: errorMessage }));
            }
        }
    }//end onSubmit

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
    }
}

export default Register;
