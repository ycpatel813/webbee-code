import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const textArea = ({
    input,
    className,
    label,
    type,
    disabled,
    meta: { touched, error, warning },
    validateTextClass
}) =>
    
    (<React.Fragment>
        <textarea {...input} className={ classnames(className, { 'invalid': touched && error })} placeholder={label} disabled={disabled} type={type} />
        {touched &&
        ((error && <span className={`text-danger  ${validateTextClass ? validateTextClass:''}`}>*{error}</span>) ||
            (warning && <span className={`text-warning  ${validateTextClass ? validateTextClass:''}`}>{warning}</span>))}
    
    </React.Fragment>
    );
textArea.propTypes = {
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
    passwordField: PropTypes.bool
};
    
textArea.defaultProps = {
    disabled: false
};
      
export default textArea;
