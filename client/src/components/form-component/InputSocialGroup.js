import React from 'react'

const InputSocialGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange,
    onInput,
    className,
    id
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>
            <input
                type={type}
                onChange={onChange}
                onInput={onInput}
                className={!error ? `${className}` : `is-invalid ${className}`}
                placeholder={placeholder}
                name={name}
                value={value}
                id={id}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


export default InputSocialGroup;