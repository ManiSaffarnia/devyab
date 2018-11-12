import React from 'react'

const CheckboxGroup = ({
    className,
    disabled,
    type,
    error,
    id,
    info,
    name,
    onChange,
    value,
    label,
    htmlFor,
}) => {
    return (
        <div className="form-check mb-4">
            <input
                type={type}
                id={id}
                className={!error ? `${className}` : `is-invalid ${className}`}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <label className="form-check-label" htmlFor={htmlFor}>
                {label}
            </label>
            {error && <span className="invalid-feedback">{error}</span>}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    )
}


export default CheckboxGroup;