import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderField = ({
    input,
    className,
    label,
    type,
    disabled,
    meta: { touched, error, warning },
    validateTextClass,
    max
}) =>
    
    (<React.Fragment>
        <input {...input} className={ classnames(className, { 'invalid': touched && error })} placeholder={label} disabled={disabled} type={type} max={max}/>
        {touched &&
            ((error && <span className={`text-danger  ${validateTextClass ? validateTextClass:''}`}>*{error}</span>) ||
                (warning && <span className={`text-warning  ${validateTextClass ? validateTextClass:''}`}>{warning}</span>))}
        
    </React.Fragment>
    );

renderField.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    input: PropTypes.object.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    hint: PropTypes.string,
    meta: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    margin: PropTypes.object,
    validateTextClass: PropTypes.string,
    passwordField: PropTypes.bool,
    max: PropTypes.string
};

renderField.defaultProps = {
    disabled: false
};
  
export default renderField;
