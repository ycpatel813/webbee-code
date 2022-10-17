import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderSelect = ({
    input,
    className,
    label,
    type,
    disabled,
    children,
    meta: { touched, error, warning },
    validateTextClass
}) =>
    (<React.Fragment>
        <select {...input} className={ classnames(className, { 'invalid': touched && error })} placeholder={label} disabled={disabled} type={type}>
            {children}
        </select>
        {touched &&
            ((error && <span className={`text-danger  ${validateTextClass ? validateTextClass:''}`}>*{error}</span>) ||
                (warning && <span className={`text-warning  ${validateTextClass ? validateTextClass:''}`}>{warning}</span>))}
        
    </React.Fragment>
    );

renderSelect.propTypes = {
    children: PropTypes.array,
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
    passwordField: PropTypes.bool,
    validateTextClass: PropTypes.string
};

renderSelect.defaultProps = {
    disabled: false
};
  
export default renderSelect;
