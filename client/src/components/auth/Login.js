import React, { Component } from 'react'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }


    onInputChangeHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        this.setState(() => (
            { [inputFieldName]: inputData }
        ));
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        console.log(this.state);
    }


    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="form-group">
                                    <input type="email" onChange={this.onInputChangeHandler} className="form-control form-control-lg" placeholder="Email Address" name="email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" onChange={this.onInputChangeHandler} className="form-control form-control-lg" placeholder="Password" name="password" />
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

export default Login;