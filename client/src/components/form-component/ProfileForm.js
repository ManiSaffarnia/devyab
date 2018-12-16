import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFieldGroup from './TextFieldGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import SelectListGroup from './SelectListGroup';
import InputSocialGroup from './InputSocialGroup';
import isEmpty from '../../validation/isEmpty';
import { profileValidation, profileRealTimeValidation } from '../../validation/profile';
import { uploadAvatar } from '../../actions/profiles';


class ProfileForm extends Component {

    state = {
        handle: (this.props.profile && "handle" in this.props.profile) ? this.props.profile.handle : '',
        company: (this.props.profile && "company" in this.props.profile) ? this.props.profile.company : '',
        website: (this.props.profile && "website" in this.props.profile) ? this.props.profile.website : '',
        location: (this.props.profile && "location" in this.props.profile) ? this.props.profile.location : '',
        jobStatus: (this.props.profile && "jobStatus" in this.props.profile) ? this.props.profile.jobStatus : '',
        skills: (this.props.profile && "skills" in this.props.profile) ? this.props.profile.skills : '',
        github: (this.props.profile && "github" in this.props.profile) ? this.props.profile.github : '',
        bio: (this.props.profile && "bio" in this.props.profile) ? this.props.profile.bio : '',
        twitter: (this.props.profile && "twitter" in this.props.profile) ? this.props.profile.twitter : '',
        facebook: (this.props.profile && "facebook" in this.props.profile) ? this.props.profile.facebook : '',
        linkedin: (this.props.profile && "linkedin" in this.props.profile) ? this.props.profile.linkedin : '',
        youtube: (this.props.profile && "youtube" in this.props.profile) ? this.props.profile.youtube : '',
        instagram: (this.props.profile && "instagram" in this.props.profile) ? this.props.profile.instagram : '',
        avatar: null,
        avatarPath: (this.props.profile && "user" in this.props.profile) ? this.props.profile.user.avatar : null,
        errors: {},
        displaySocialInputs: false
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            this.setState(() => ({
                ...nextProps.profile
            }))
        }

        if (nextProps.errors && !nextProps.errors.errorMessage) {
            this.setState(() => ({ errors: nextProps.errors }));
        }
    }//END


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


    handleFileUpload = (e) => {
        //setSTATE
        this.setState({ avatar: e.target.files[0] });
        const image = e.target.files[0];

        //display avatar preview
        const avatar = document.getElementById('avatar');
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ avatarPath: reader.result });
        }

        if (image) {
            reader.readAsDataURL(image);
        }
    }//END FILE UPLOAD

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">

                    <div className="avatar-input">

                        <div className="avatar-preview" id="avatar" style={{ backgroundImage: `url(${this.state.avatarPath ? this.state.avatarPath.replace(/\\/g, "/") : '../img/default-profile1.png'})` }}>
                        </div>
                    </div>

                    <div className="input-group mb-5">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={this.handleFileUpload} />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose your profile picture </label>
                        </div>
                    </div>

                    <hr className="mb-5"></hr>

                    <h2 className="text-center" style={{ fontWeight: 100, marginBottom: "30px" }}>Profile information</h2>
                    <small className="d-block pb-3">Fields with * are required</small>
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

const mapStateToProps = (state) => ({
    profile: state.profiles.profile,
    errors: state.errors
})


export default connect(mapStateToProps, null)(ProfileForm);