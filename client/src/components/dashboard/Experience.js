import React from 'react'

const Experience = (props) => {
    const { companyName, title, startDate, endDate, current, _id } = props.experience

    const onDeleteHandler = (e) => {
        props.onDeleteHandler(_id); //handleri ro ke az bala pass dadim seda mikonim
    };

    return (
        <tr>
            <td className="table-info-column">{companyName}</td>
            <td className="table-info-column">{title}</td>
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


export default Experience;