import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editProfile } from '../../actions/profiles';
import ProfileForm from '../form-component/ProfileForm';


class EditProfile extends Component {
    state = {
        profiles: this.props.profiles
    }

    //On Submit Handler
    onSubmitHandler = (data) => {
        const editedProfile = {
            handle: data.handle,
            company: data.company,
            website: data.website,
            location: data.location,
            jobStatus: data.jobStatus,
            skills: data.skills.join(),
            github: data.github,
            bio: data.bio,
            twitter: data.twitter,
            facebook: data.facebook,
            linkedin: data.linkedin,
            youtube: data.youtube,
            instagram: data.instagram
        }
        this.props.editProfile(editedProfile, this.props.history);
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
                                <h1 className="display-4 text-center">Edit Profile</h1>
                                <small className="d-block pb-3">Fields with * are required</small>
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
    editProfile: (data, history) => { dispatch(editProfile(data, history)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);