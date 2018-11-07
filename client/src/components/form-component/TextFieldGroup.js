import React from 'react'

const TextFieldGroup = ({
    className,
    disabled,
    error,
    id,
    info,
    type,
    name,
    onChange,
    onInput,
    placeholder,
    value
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                onChange={onChange}
                className={!error ? `${className}` : `is-invalid ${className}`}
                placeholder={placeholder}
                name={name}
                value={value}
                disabled={disabled}
                id={id}
                onInput={onInput}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


TextFieldGroup.defaultProps = {
    type: 'text'
}


export default TextFieldGroup;