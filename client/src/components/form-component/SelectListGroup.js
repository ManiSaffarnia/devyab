import React from 'react'

const SelectListGroup = ({
    className,
    error,
    id,
    info,
    name,
    onChange,
    value,
    options
}) => {
    return (
        <div className="form-group">
            <select
                onChange={onChange}
                className={!error ? `${className}` : `is-invalid ${className}`}
                name={name}
                value={value}
                id={id}
            >
                {options.map((opt, index) => {
                    return (<option key={index} value={opt.value}>{opt.label}</option>)
                })}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    )
}



export default SelectListGroup;