import React, { Component } from 'react'
import { connect } from 'react-redux';
import { startGetALLProfiles } from '../../actions/profiles';
import DevelopersList from './DevelopersList';
import Loading from '../Loading';

class DevelopersPage extends Component {

    componentDidMount() {
        this.props.getAllProfiles();
    }

    render() {
        let jsx;
        if (this.props.isLoading) jsx = <Loading />;
        else if (this.props.profiles === null || this.props.profiles.length === 0) jsx = <h4 style={{ textAlign: "center", marginTop: "15rem" }}>there is no developers</h4>;
        else jsx = <DevelopersList profiles={this.props.profiles} />;

        return (
            <div className="Developers">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developer</p>
                            {jsx}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}//END COMPONENT

const mapStateToProps = (state) => ({
    profiles: state.profiles.profiles,
    isLoading: state.profiles.loading
});

const mapDispatchToProps = (dispatch) => ({
    getAllProfiles: () => { dispatch(startGetALLProfiles()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersPage);