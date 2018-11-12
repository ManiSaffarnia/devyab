import React from 'react'

const DatePickerGroup = ({
    className,
    disabled,
    error,
    id,
    info,
    name,
    onChange,
    onInput,
    value
}) => {
    return (
        <div className="form-group">
            <input
                type="date"
                id={id}
                className={!error ? `${className}` : `is-invalid ${className}`}
                name={name}
                value={value}
                onChange={onChange}
                onInput={onInput}
                disabled={disabled}
            />
            {error && <div className="invalid-feedback">{error}</div>}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    )
}


export default DatePickerGroup;