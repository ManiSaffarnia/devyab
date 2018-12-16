import React, { Component } from 'react'
import TextAreaFieldGroup from './TextAreaFieldGroup';
import { postValidation } from '../../validation/post';

class PostForm extends Component {

    state = {
        text: "",
        errors: {}
    }

    onInputChangeHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        //set state
        this.setState(() => ({ [inputFieldName]: inputData }));
    };//End

    onSubmit = async (e) => {
        e.preventDefault();
        //input validation
        const { isValid, errors } = postValidation(this.state.text);
        //console.log(isValid);
        if (!isValid) this.setState(() => ({ errors })); //validation Error
        else {
            this.props.onSubmit(this.state);
            this.setState({ text: "" });
        }
    }//END SUBMIT

    render() {
        return (
            <div className={this.props.nameOfClass}>
                <div className="card-header bg-info text-white">
                    Say Somthing...
                    </div>
                <form onSubmit={this.onSubmit} className="post-form">
                    <TextAreaFieldGroup
                        className="form-control form-control-lg"
                        placeholder="Create a post"
                        name="text"
                        value={this.state.text}
                        error={this.state.errors.text}
                        onChange={this.onInputChangeHandler}
                    />
                    <button type="submit" className="btn btn-info">Submit</button>
                </form>
                <hr></hr>
            </div>
        )
    }
}

export default PostForm;