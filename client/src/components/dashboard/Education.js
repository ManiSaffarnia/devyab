import React from 'react'

const Education = (props) => {
    const { _id, schoolTitle, degree, current, startDate, endDate } = props.education;

    const onDeleteHandler = () => {
        props.onDeleteHandler(_id);
    };

    return (
        <tr>
            <td className="table-info-column">{schoolTitle}</td>
            <td className="table-info-column">{degree}</td>
            <td className="table-info-date">
                {new Date(startDate).toISOString().split('T')[0]} - {current ? "Now" : new Date(endDate).toISOString().split('T')[0]}
            </td>
            <td className="table-delete-column">
                <button className="btn btn-danger" onClick={onDeleteHandler}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default Education;