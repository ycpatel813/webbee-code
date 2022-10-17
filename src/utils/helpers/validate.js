/* eslint-disable no-undefined */
export const required = value => {
    if(value) {
        if(typeof value === 'string') {
            if(value.trim()) {
                return '';
            }
            
            return 'Required';
        }
        if(typeof value === 'number') {
            return '';
        }

        return '';
    }

    return 'Required';
};
export const trim = value => value ? value.trim() : '';

export const emailValidate = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    
    'Invalid email address' : undefined;

export const number = value => value && isNaN(Number(value)) ? 'Must be a digit' : undefined;

const MAXCHAR = 40;
const PHONECHAR = 10;

export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

const minLength = min => value => {
    if(value) {
        if (value?.trim() === '' || value?.length === min) {
            return '';
        }

        return `Must be ${min} characters`;
    }

    return '';
};

export const maxChar40 = maxLength(MAXCHAR);
export const minChar10 = minLength(PHONECHAR);
