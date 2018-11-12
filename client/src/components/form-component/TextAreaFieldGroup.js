import React from 'react'

const TextAreaFieldGroup = ({
    className,
    error,
    id,
    info,
    name,
    onChange,
    onInput,
    placeholder,
    value
}) => {
    return (
        <div className="form-group">
            <textarea
                onChange={onChange}
                className={!error ? `${className}` : `is-invalid ${className}`}
                placeholder={placeholder}
                name={name}
                value={value}
                id={id}
                onInput={onInput}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}



export default TextAreaFieldGroup;