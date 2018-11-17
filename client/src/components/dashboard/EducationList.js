import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profiles';
import Education from './Education';

class EducationList extends Component {

    onDeleteHandler = (id) => {
        this.props.deleteEducation(id, this.props.history);
    }

    render() {
        return (
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
                        {
                            this.props.educations.map((education) => {
                                return (
                                    <Education
                                        education={education}
                                        key={education._id}
                                        onDeleteHandler={this.onDeleteHandler}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }//END RENDER

}//END COMPONENT


const mapDispatchToProps = (dispatch) => ({
    deleteEducation: (id, history) => { dispatch(deleteEducation(id, history)) }
});

export default connect(null, mapDispatchToProps)(EducationList);
