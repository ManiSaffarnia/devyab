import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profiles';
import ProfileForm from '../form-component/ProfileForm';


class CreateProfile extends Component {

    //On Submit Handler
    onSubmitHandler = (data) => {
        const newProfile = {
            handle: data.handle,
            avatar: (data.avatar) ? data.avatar : '',
            company: data.company,
            website: data.website,
            location: data.location,
            jobStatus: data.jobStatus,
            skills: data.skills,
            github: data.github,
            bio: data.bio,
            twitter: data.twitter,
            facebook: data.facebook,
            linkedin: data.linkedin,
            youtube: data.youtube,
            instagram: data.instagram
        }

        console.log(newProfile.avatar);
        this.props.createProfile(newProfile, this.props.history);
    };//End

    render() {
        return (
            <React.Fragment>
                <div className="create-profile">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <Link to="/dashboard" className="btn btn-info">
                                    <i className="fas fa-home"></i> Dashboard
                                </Link>
                                <h1 className="display-4 text-center">Create Your Profile</h1>
                                <p className="lead text-center">Let's get some information to make your profile stand out</p>
                                <ProfileForm onSubmit={this.onSubmitHandler} profiles={this.props.profiles} />
                            </div>
                        </div>
                    </div>
                </div>

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
            </React.Fragment>
        )
    }//END RENDER

}//END COMPONENT

const mapStateToProps = (state) => ({
    profiles: state.profiles,
    isLoading: state.profiles.loading,
    errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
    createProfile: (data, history) => dispatch(createProfile(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);