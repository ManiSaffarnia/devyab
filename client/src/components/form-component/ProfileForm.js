import React, { Component } from 'react'
import TextFieldGroup from './TextFieldGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import SelectListGroup from './SelectListGroup';
import InputSocialGroup from './InputSocialGroup';
import isEmpty from '../../validation/isEmpty';
import { profileValidation, profileRealTimeValidation } from '../../validation/profile';


class ProfileForm extends Component {

    state = {
        handle: !isEmpty(this.props.profiles.profile) ? this.props.profiles.profile.handle : '',
        company: !isEmpty(this.props.profiles.profile.company) ? this.props.profiles.profile.company : '',
        website: !isEmpty(this.props.profiles.profile.website) ? this.props.profiles.profile.website : '',
        location: !isEmpty(this.props.profiles.profile.location) ? this.props.profiles.profile.location : '',
        jobStatus: !isEmpty(this.props.profiles.profile) ? this.props.profiles.profile.jobStatus : '',
        skills: !isEmpty(this.props.profiles.profile) ? this.props.profiles.profile.skills : '',
        github: !isEmpty(this.props.profiles.profile.github) ? this.props.profiles.profile.github : '',
        bio: !isEmpty(this.props.profiles.profile.bio) ? this.props.profiles.profile.bio : '',
        twitter: !isEmpty(this.props.profiles.profile.twitter) ? this.props.profiles.profile.twitter : '',
        facebook: !isEmpty(this.props.profiles.profile.facebook) ? this.props.profiles.profile.facebook : '',
        linkedin: !isEmpty(this.props.profiles.profile.linkedin) ? this.props.profiles.profile.linkedin : '',
        youtube: !isEmpty(this.props.profiles.profile.youtube) ? this.props.profiles.profile.youtube : '',
        instagram: !isEmpty(this.props.profiles.profile.instagram) ? this.props.profiles.profile.instagram : '',
        errors: {},
        displaySocialInputs: false
    }


    componentWillReceiveProps(nextProps) {
        console.log(this.props);
        if (nextProps.errors) {
            this.setState(() => ({
                errors: nextProps.errors.errorMessage
            }))
        }
    }//END

    componentWillMount() {
        console.log(this.props);
    }

    //On Input Change handler
    onInputChangeHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        if (inputFieldName === 'jobStatus' && !isEmpty(inputData)) {
            this.setState((preState) => {
                const clearedError = { ...preState.errors };
                delete clearedError[inputFieldName];
                return {
                    errors: { ...clearedError }
                }
            })
        }
        //set state
        this.setState(() => ({ [inputFieldName]: inputData }));
    };//End


    //on input's input event
    onInputInputHandler = (e) => {
        const inputData = e.target.value;
        const inputFieldName = e.target.name;
        const { isValid, error } = profileRealTimeValidation(inputFieldName, inputData);

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


    //Social field toggle
    onClickShowSocialHandler = (e) => {
        this.setState((prevState) => ({
            displaySocialInputs: !prevState.displaySocialInputs
        }));
    }//END


    onSubmit = async (e) => {
        e.preventDefault();

        //input validation
        const { isValid, errors } = await profileValidation(this.state, this.props.profiles.profile);
        if (!isValid) this.setState(() => ({ errors })); //validation Error
        else {
            this.props.onSubmit(this.state);
        }
    }//END SUBMIT

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>

                    <TextFieldGroup
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="* Profile handle"
                        name="handle"
                        info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                        value={this.state.handle}
                        error={this.state.errors.handle}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <SelectListGroup
                        className="form-control form-control-lg"
                        name="jobStatus"
                        options={[
                            { label: "* Select Professional Status", value: "0" },
                            { label: "Developer", value: "Developer" },
                            { label: "Junior Developer", value: "Junior Developer" },
                            { label: "Senior Developer", value: "Senior Developer" },
                            { label: "Manager", value: "Manager" },
                            { label: "Student or Learning", value: "Student or Learning" },
                            { label: "Instructor", value: "Instructor" },
                            { label: "Intern", value: "Intern" },
                            { label: "Other", value: "Other" }
                        ]}
                        info="Give us an idea of where you are at in your career"
                        value={this.state.jobStatus}
                        error={this.state.errors.jobStatus}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <TextFieldGroup
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Company"
                        name="company"
                        info="Could be your own company or one you work for"
                        value={this.state.company}
                        error={this.state.errors.company}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <TextFieldGroup
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Website"
                        name="website"
                        info="Could be your own or a company website"
                        value={this.state.website}
                        error={this.state.errors.website}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <TextFieldGroup
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Location"
                        name="location"
                        info="City & state suggested (eg. Karaj, Alborz)"
                        value={this.state.location}
                        error={this.state.errors.location}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <TextFieldGroup
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Skills"
                        name="skills"
                        info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                        value={this.state.skills}
                        error={this.state.errors.skills}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <TextFieldGroup
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Github Username"
                        name="github"
                        info="If you want your latest repos and a Github link, include your USERNAME"
                        value={this.state.github}
                        error={this.state.errors.github}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <TextAreaFieldGroup
                        className="form-control form-control-lg"
                        placeholder="Write a short biography of yourself"
                        name="bio"
                        info="Tell us a little about yourself :)"
                        value={this.state.bio}
                        error={this.state.errors.bio}
                        onChange={this.onInputChangeHandler}
                        onInput={this.onInputInputHandler}
                    />

                    <div className="mb-3">
                        <button type="button" className="btn btn-light" onClick={this.onClickShowSocialHandler}>Add Social Network Links</button>
                        <span className="text-muted">Optional</span>
                    </div>

                    {this.state.displaySocialInputs && (
                        <React.Fragment>
                            <InputSocialGroup
                                icon="fab fa-twitter"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Twitter Profile URL"
                                name="twitter"
                                error={this.state.errors.twitter}
                                value={this.state.twitter}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <InputSocialGroup
                                icon="fab fa-facebook"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Facebook Page URL"
                                name="facebook"
                                error={this.state.errors.facebook}
                                value={this.state.facebook}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <InputSocialGroup
                                icon="fab fa-linkedin"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Linkedin Profile URL"
                                name="linkedin"
                                error={this.state.errors.linkedin}
                                value={this.state.linkedin}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <InputSocialGroup
                                icon="fab fa-youtube"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="YouTube Channel URL"
                                name="youtube"
                                error={this.state.errors.youtube}
                                value={this.state.youtube}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />

                            <InputSocialGroup
                                icon="fab fa-instagram"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Instagram Page URL"
                                name="instagram"
                                error={this.state.errors.instagram}
                                value={this.state.instagram}
                                onChange={this.onInputChangeHandler}
                                onInput={this.onInputInputHandler}
                            />
                        </React.Fragment>
                    )}
                    <input type="submit" className="btn btn-info btn-block mt-4" disabled={!isEmpty(this.state.errors)} />
                </form>
            </React.Fragment>
        )
    }
}


export default ProfileForm;