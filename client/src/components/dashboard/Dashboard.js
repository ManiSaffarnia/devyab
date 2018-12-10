import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetUserProfile, deleteProfile } from '../../actions/profiles';
import ExperienceList from './ExperienceList';
import EducationList from './EducationList';
import Loading from '../Loading';
import isEmpty from '../../validation/isEmpty';
import DeleteAlert from '../DeleteAlert';
import Dialog from '@material-ui/core/Dialog';

class Dashboard extends Component {
    state = {
        open: false
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onDeleteProfileHandler = (e) => {
        this.setState(() => ({ open: true }));
    }//END

    onDeleteApproved = () => {
        this.props.deleteProfile(this.props.history);
    }

    render() {
        const { profile, loading } = this.props.profiles;

        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Loading />
        }
        else {
            if (isEmpty(profile)) {
                dashboardContent = (
                    <React.Fragment>
                        <p className="lead text-muted"> Welcome {this.props.auth.user.name}</p>
                        <p>You have not yet setup your profile, please add some info about yourself.</p>
                        <p>We are excited to know more about you :)</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </React.Fragment>
                )
            }
            else {
                dashboardContent = (
                    <React.Fragment>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Dashboard</h1>
                                <p className="lead text-muted"> Welcome <Link to={`/Profile/${profile.handle}`}>{profile.user.name}</Link></p>

                                <div className="btn-group mb-4" role="group">
                                    <Link to="/edit-profile" className="btn btn-secondary mr-1">
                                        <i className="fas fa-user-circle text-light mr-1"></i> Edit Profile
                                </Link>

                                    <Link to="/add-experience" className="btn btn-secondary mr-1">
                                        <i className="fas fa-file-alt text-light mr-1"></i>Add Job Experience
                                </Link>
                                    <Link to="/add-education" className="btn btn-secondary">
                                        <i className="fas fa-graduation-cap text-light mr-1"></i>Add Education
                                </Link>
                                </div>


                                {/** EXPERIENCE LIST*/}
                                <ExperienceList history={this.props.history} experiences={this.props.profiles.profile.jobExperience} />


                                {/** EDUCARION LIST*/}
                                <EducationList history={this.props.history} educations={this.props.profiles.profile.education} />


                                <div style={{ marginBottom: "60px" }}>
                                    <button className="btn btn-danger" onClick={this.onDeleteProfileHandler}>
                                        Delete My Profile
                            </button>
                                </div>
                            </div>

                        </div>


                        {/** ALERT*/}
                        <div>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DeleteAlert opne={this.handleClickOpen} close={this.handleClose} title="Delete Profile" message="Are you sure about deleting your profile? This can NOT be undone!" delete={this.onDeleteApproved} />
                            </Dialog>
                        </div>

                    </React.Fragment>
                );
            }

        }//end else

        return (
            <React.Fragment>
                <div className="dashboard">
                    <div className="container">
                        {dashboardContent}
                    </div>
                </div>
            </React.Fragment>
        )
    }//END RENDER


}//END COMPONENT

const mapStateToProps = (state) => ({
    auth: state.auth,
    profiles: state.profiles
});

const mapDispatchToProps = (dispatch) => ({
    getUserProfile: () => { dispatch(startGetUserProfile()) },
    deleteProfile: (history) => { dispatch(deleteProfile(history)) }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);