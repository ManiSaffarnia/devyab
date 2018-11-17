import React, { Component } from 'react';
import Developer from './Developer';

class DevelopersList extends Component {
    render() {
        return (
            <React.Fragment>
                {/*Profile Item*/}
                {this.props.profiles.map((profile) => {
                    return <Developer profile={profile} key={profile._id} />
                })}
            </React.Fragment>
        )
    }
}//END COMPONENT

export default DevelopersList;