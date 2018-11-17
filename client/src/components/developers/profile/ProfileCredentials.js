import React from 'react';

const ProfileCredentials = (props) => {
    const jobExperiences = props.jobExperiences;
    const educations = props.educations;

    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Experience</h3>
                {(!jobExperiences || jobExperiences.length === 0) ? (
                    <p className="text-center">No Experience Listed</p>
                ) : (
                        <ul className="list-group">
                            {jobExperiences.map((experience) => {
                                return (
                                    <li key={experience._id} className="list-group-item">
                                        <h4>{experience.companyName ? experience.companyName : "Unknown"}</h4>
                                        <p>{new Date(experience.startDate).toISOString().split('T')[0]} - {experience.current ? "Now" : new Date(experience.endDate).toISOString().split('T')[0]}</p>
                                        <p>
                                            <strong>Position:</strong> {experience.title}
                                        </p>
                                        <p>
                                            <strong>Description:</strong> {experience.description}
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
            </div>
            <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                {!educations ? (
                    <p className="text-center">No Education Listed</p>
                ) : (
                        <ul className="list-group">
                            {educations.map((education) => {
                                return (
                                    <li key={education._id} className="list-group-item">
                                        <h4>{education.schoolTitle}</h4>
                                        <p>{new Date(education.startDate).toISOString().split('T')[0]} - {education.current ? "Now" : new Date(education.endDate).toISOString().split('T')[0]}</p>
                                        <p>
                                            <strong>Degree: </strong>{education.degree}
                                        </p>
                                        <p>
                                            <strong>Field Of Study: </strong>{education.fieldOfStudy}
                                        </p>
                                        <p>
                                            <strong>GPA: </strong>{education.GPA}
                                        </p>
                                        <p>
                                            <strong>Description:</strong> {education.description}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

            </div>
        </div>
    )
}//END COMPONENT

export default ProfileCredentials;