import React from 'react';

const ProfileHeader = (props) => {
    const { jobStatus, company, location, website } = props.devProfile;
    const { name, avatar } = props.devProfile.user;
    const { twitter, facebook, instagram, linkedin, youtube } = props.devProfile.social ? props.devProfile.social : {};
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto" style={{ textAlign: "center" }}>
                            <img className="rounded-circle developer-image-lg" src={avatar ? avatar : "../img/default-profile1.png"} alt="developer avatar" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{name}</h1>
                        <p className="lead text-center">{jobStatus} at {company ? company : "Unknown"}</p>
                        <p>{location ? location : "Some where on the earth planet"}</p>
                        <p>
                            {website &&
                                <a className="text-white p-2" href={website}>
                                    <i className="fas fa-globe fa-2x"></i>
                                </a>}
                            {twitter &&
                                <a className="text-white p-2" href={twitter}>
                                    <i className="fab fa-twitter fa-2x"></i>
                                </a>}
                            {facebook &&
                                <a className="text-white p-2" href={facebook}>
                                    <i className="fab fa-facebook fa-2x"></i>
                                </a>}
                            {linkedin &&
                                <a className="text-white p-2" href={linkedin}>
                                    <i className="fab fa-linkedin fa-2x"></i>
                                </a>}
                            {instagram &&
                                <a className="text-white p-2" href={instagram}>
                                    <i className="fab fa-instagram fa-2x"></i>
                                </a>
                            }
                            {youtube &&
                                <a className="text-white p-2" href={youtube}>
                                    <i className="fab fa-youtube fa-2x"></i>
                                </a>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;