import React from 'react'
import { Link } from 'react-router-dom';

const Developer = (props) => {
    const { jobStatus, company, location, skills, description, handle } = props.profile;
    const { name, avatar } = props.profile.user;

    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle developer-image-md" src={avatar ? avatar : "./img/default-profile1.png"} alt="avatar" />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{name}</h3>
                    <p>{jobStatus} at {company ? company : "Unknown"}</p>
                    <p>{location ? location : "Some where on the earth planet"}</p>
                    <p>{description ? description : ""}</p>
                    <Link to={`/profile/${handle}`} className="btn btn-info">View Profile</Link>
                </div>
                <div className="col-md-4 d-none d-lg-block">
                    <h4>Skill Set</h4>
                    <div className="dev-skill-tags">
                        <ul className="list-group">
                            {skills.map((skill, index) => {
                                return (
                                    <li key={index}>
                                        <span>{skill}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                </div>
            </div>
        </div>



        // <div className="dev-content">
        //     <div className="dev-card">
        //         <div className="dev-firstinfo"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/mrvanz/128.jpg" />
        //             <div className="dev-profileinfo">
        //                 <h1>Francesco Moustache</h1>
        //                 <h3>Python Ninja</h3>
        //                 <p className="bio">Lived all my life on the top of mount Fuji, learning the way to be a Ninja Dev.</p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="badgescard"><i className="fab fa-instagram"></i> <span className="devicons devicons-django"></span><span className="devicons devicons-python"> </span><span className="devicons devicons-codepen"></span><span className="devicons devicons-javascript_badge"></span><span className="devicons devicons-gulp"></span><span className="devicons devicons-angular"></span><span className="devicons devicons-sass"> </span></div>
        // </div>
    )
}

export default Developer;