import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetUserProfile } from '../../actions/profiles';
import Loading from '../Loading';
import isEmpty from '../../validation/isEmpty';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getUserProfile();
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
                        <p className="lead text-muted"> Welcome {profile.user.name}</p>

                        <div className="btn-group mb-4" role="group">
                            <a href="edit-profile.html" className="btn btn-light">
                                <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</a>
                            <a href="add-experience.html" className="btn btn-light">
                                <i className="fab fa-black-tie text-info mr-1"></i>
                                Add Experience</a>
                            <a href="add-education.html" className="btn btn-light">
                                <i className="fas fa-graduation-cap text-info mr-1"></i>
                                Add Education</a>
                        </div>


                        <div>
                            <h4 className="mb-2">Experience Credentials</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Title</th>
                                        <th>Years</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tech Guy Web Solutions</td>
                                        <td>Senior Developer</td>
                                        <td>
                                            02-03-2009 - 01-02-2014
                                    </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                Delete
                                        </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Traversy Media</td>
                                        <td>Instructor & Developer</td>
                                        <td>
                                            02-03-2015 - Now
                                    </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                Delete
                                        </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div>
                            <h4 className="mb-2">Education Credentials</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>School</th>
                                        <th>Degree</th>
                                        <th>Years</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Northern Essex</td>
                                        <td>Associates</td>
                                        <td>
                                            02-03-2007 - 01-02-2009
                                    </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                Delete
                                        </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginBottom: "60px" }}>
                            <button className="btn btn-danger">
                                Delete My Account
                        </button>
                        </div>

                    </React.Fragment>
                );
            }

        }//end else

        return (
            <React.Fragment>
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Dashboard</h1>
                                {dashboardContent}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }//END RENDER


}//END COMPONENR

const mapStateToProps = (state) => ({
    auth: state.auth,
    profiles: state.profiles
});

const mapDispatchToProps = (dispatch) => ({
    getUserProfile: () => { dispatch(startGetUserProfile()) }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);