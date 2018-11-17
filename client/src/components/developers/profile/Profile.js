import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCredentials from './ProfileCredentials';
import ProfileGithub from './ProfileGithub';
import { startGetProfileByHandle } from '../../../actions/profiles';
import Loading from '../../Loading';

class Profile extends Component {


    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getDeveloperByHandle(this.props.match.params.handle);
        }
    }


    render() {

        let jsx;
        if (this.props.devProfile === null) jsx = <Loading />; //tooye render avalie chon devProfile khalie Loading neshoon midam
        else jsx = (
            <React.Fragment>
                {/**<!-- Profile Header --> */}
                <ProfileHeader devProfile={this.props.devProfile} />

                {/**<!-- Profile About --> */}
                <ProfileAbout devProfile={this.props.devProfile} />

                {/**<!-- Profile Creds --> */}
                <ProfileCredentials educations={this.props.devProfile.education} jobExperiences={this.props.devProfile.jobExperience} />

                {/**<!-- Profile Github --> */}
                {this.props.devProfile.github ? <ProfileGithub github={this.props.devProfile.github} /> : ""}

            </React.Fragment>)


        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/developers" className="btn btn-info mb-3 float-left">Back To Profiles</Link>
                                </div>
                                <div className="col-6"></div>
                            </div>

                            {jsx}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    devProfile: state.profiles.devProfile
});

const mapDispatchToProps = (dispatch) => ({
    getDeveloperByHandle: (handle) => { dispatch(startGetProfileByHandle(handle)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
