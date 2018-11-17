import React from 'react';

const ProfileAbout = (props) => {
    const { skills, bio } = props.devProfile;
    const { name } = props.devProfile.user;
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">{name.trim().split(' ')[0]}'s Bio</h3>
                    {bio ? <p className="lead">{bio}</p> : <p className="text-center">Does not have a bio</p>}
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {skills.map((skill, index) => {
                                return (
                                    <div key={index} className="p-3">
                                        <i className="fa fa-check"></i> {skill}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}//END COMPONENT


export default ProfileAbout;