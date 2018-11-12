import React from 'react'

const Experience = (props) => {
    const { companyName, title, startDate, endDate, current, _id } = props.experience

    const onDeleteHandler = (e) => {
        props.onDeleteHandler(_id);
    };

    return (

        <tr>
            <td>{companyName}</td>
            <td>{title}</td>
            <td>
                {new Date(startDate).toISOString().split('T')[0]} - {current ? "Now" : new Date(endDate).toISOString().split('T')[0]}
            </td>
            <td>
                <button className="btn btn-danger" onClick={onDeleteHandler}>
                    Delete
                </button>
            </td>
        </tr>
    )
}


export default Experience;