import React, { Component } from 'react';
import { connect } from 'react-redux';
import Experience from './Experience';
import { deleteExperience } from '../../actions/profiles';

class ExperienceList extends Component {

    onDeleteHandler = (id) => {
        this.props.deleteExperience(id, this.props.history);
    }

    render() {
        return (
            <div className="Experience-List">
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
                        {this.props.experiences.map((experience) => {
                            return (
                                <Experience
                                    experience={experience}
                                    key={experience._id}
                                    onDeleteHandler={this.onDeleteHandler}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }//END RENDER

}//END COMPONENT


const mapDispatchToProps = (dispatch) => ({
    deleteExperience: (id, history) => { dispatch(deleteExperience(id, history)) }
});

export default connect(null, mapDispatchToProps)(ExperienceList);