
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap-modal';
import _ from 'lodash'

import renderField from '../../common/render_field';
import renderSelect from '../../common/render_select';
import { required, maxChar40 } from '../../utils/helpers/validate';
import { toast } from '../../utils/toast';
import { TITLES, TYPES } from '../../utils/helpers/constant';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const AddMachineTypeForm = ({
    addMachineType, 
    attribute, 
    change, 
    closeModal, 
    edit_attribute, 
    editMachineType, 
    editMachineTypeId,
    initialValues, 
    invalid, 
    modalIsOpen, 
    property,
    reset, 
    submitting, 
    title, 
    type, 
    untouch
}) => {

    const [fields, setFields] = useState([]);
    const [titles, setTitles] = useState(TITLES);
    const [editType, setEditType] = useState(null);

    useEffect(() => {
        if (Object.keys(initialValues).length !== 0) {
            const updateTitles = [...titles];
            updateTitles.push(...(_.map(initialValues.fields, 'name')))
            setTitles(_.uniq(updateTitles))
            if(editMachineTypeId) setFields(initialValues.fields)
        } else {
            setFields([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues])

    const resetFields = () => {
        change('property', '');
        untouch('property');
    }

    const addNewField = () => {
        if(!attribute || !property) {
            toast.error('Property Name and Type are required.');
            return;
        };
        const updateFields = [...fields];
        if(property) {
            const findIndex = updateFields.findIndex(type => _.lowerCase(type.name) === _.lowerCase(property))
            if(findIndex >= 0) {
                toast.error('Same Property is not allow.');
            }
        };
        updateFields.push({ value: attribute, name: property, _id: Math.random().toString(36).slice(2, 10) })
        const updateTitles = [...titles];
        updateTitles.push(property)
        setTitles(updateTitles)
        setFields(updateFields);
        resetFields();
    };

    const editField = (field) => {
        setEditType(field._id);
        change('edit_attribute', field.value);
    };

    const editFieldType = (field) => {
        const updateFields = [...fields];
        const findIndex = updateFields.findIndex(type => type._id === field._id)
        updateFields[findIndex] = {...field, value: edit_attribute};
        setFields(updateFields);
        setEditType(null);
    };

    const deleteField = (index, field) => {
        const updateFields = [...fields];
        updateFields.splice(index, 1)
        const updateTitles = [...titles];
        const findIndex = updateTitles.findIndex(title => field.name === title);
        updateTitles.splice(findIndex,1);
        setTitles(updateTitles)
        setFields(updateFields);
    };

    const resetState = () => {
        setFields([]);
        setTitles(TITLES);
    };

    const saveMachineType = () => {
        if(editMachineTypeId){
            editMachineType({ type, title, fields, _id: editMachineTypeId })
        } else {
            addMachineType({ type, title, fields, _id: Math.random().toString(36).slice(2, 10) })
        }
        closeModal(reset, resetState)
    };

    const renderTypes = (name) => {
        return (<Field className='form-control form-control-user'
            validateTextClass={'offset-md-9'}
            name={name}
            component={renderSelect}>
            <option value='' disabled>Type</option>
            {TYPES.map((type, index) => <option key={index} value={type.value}>{type.text} </option>)}
        </Field>)
    }

    return (
        <Modal
            show={modalIsOpen}
            style={customStyles}
            backdrop='static'
            className='modal-container'
            centered>

            <form onSubmit={e => e.preventDefault()}>
                <Modal.Header>
                    <h5>
                        {editMachineTypeId ? 'Edit Machine Type' : 'Add Machine Type'}
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group'>
                        <label htmlFor='type'>Name</label>
                        <Field className='form-control' validate={[required, maxChar40]} name='type' component={renderField} type='text' />
                    </div>
               
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor='property'>New Property</label>
                        </div>
                        <div className='col-4'>
                            <label htmlFor='attribute'>Type</label>
                        </div>
                    </div>
                    <hr className='mt-0'></hr>

                    <div className='new-property'>
                        <div className='row'>
                            <div className='col-6'>
                                <Field
                                    className='form-control'
                                    validate={[maxChar40]}
                                    name='property'
                                    component={renderField}
                                    type='text' />
                            </div>
                            <div className='col-4'>
                                {renderTypes('attribute')}
                            </div>
                            <div className='col-2'>
                                <button className='btn btn-primary' onClick={addNewField}>+</button>
                            </div>
                        </div>

                        {fields?.map((field, index) =>
                            
                            <div key={field._id} className='row mt-2'>
                                <div className='col-6'>
                                    <label htmlFor='property'>{field.name}</label>
                                </div>
                                <div className='col-4'>
                                    {!(field._id === editType)  ? <label htmlFor='attribute'>{_.capitalize(field.value)}</label> : renderTypes('edit_attribute')}
                                </div>
                                <div className='col-2'>
                                {!(field._id === editType)  ? (<><button
                                        className='btn btn-primary pt-0 pb-0 pr-1 pl-1'
                                        onClick={() => editField(field)}>
                                        E
                                    </button>
                                    <button
                                        className='btn btn-danger pt-0 pb-0 pr-1 pl-1'
                                        onClick={() => deleteField(index, field)}>
                                        D
                                    </button></>) : (<>
                                    <button
                                        className='btn btn-primary pt-0 pb-0 pr-1 pl-1'
                                        onClick={() => editFieldType(field)}>
                                        ✓
                                    </button>
                                    <button
                                        className='btn btn-danger pt-0 pb-0 pr-1 pl-1'
                                        onClick={() => setEditType(null)}>
                                        x
                                    </button>
                                    </>)}
                                </div>
                            </div>

                        )}
                    </div>
                    <hr></hr>

                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <Field 
                            className='form-control' 
                            validate={[required, maxChar40]} 
                            name='title' 
                            component={renderSelect} >
                            <option value='' disabled>Title</option>
                            {titles.map((title, index) => <option key={index} value={title}>{title} </option>)}
                            </Field>
              
                    </div>
                  </Modal.Body>
                <Modal.Footer>

                    <button className='btn btn-primary' onClick={saveMachineType} disabled={invalid || submitting || editType}>
                        Save
                    </button>

                    <button type='button' className='btn btn-secondary ml-2' onClick={() => closeModal(reset, resetState)}>
                        Close
                    </button>

                </Modal.Footer>
            </form>
        </Modal>
    );
};

let AddMachineTypeView = reduxForm({
    // a unique name for the form
    form: 'AddMachineType',
    enableReinitialize: true
})(AddMachineTypeForm);

AddMachineTypeForm.propTypes = {
    addMachineType: PropTypes.func, 
    attribute: PropTypes.string, 
    change:  PropTypes.func, 
    closeModal: PropTypes.func, 
    edit_attribute: PropTypes.string, 
    editMachineType:  PropTypes.func, 
    editMachineTypeId: PropTypes.string,
    initialValues: PropTypes.object, 
    invalid: PropTypes.bool, 
    modalIsOpen: PropTypes.bool, 
    property: PropTypes.string,
    reset: PropTypes.func, 
    submitting: PropTypes.bool, 
    title: PropTypes.string, 
    type: PropTypes.string, 
    untouch:  PropTypes.func
};

// Decorate with connect to read form values
// <-- same as form name
const selector = formValueSelector('AddMachineType');
AddMachineTypeView = connect(state => {
    const { type, title, property, attribute, edit_attribute } = 
        selector(state, 'type', 'title', 'property', 'attribute', 'edit_attribute');

    return {
        type, title, property, attribute, edit_attribute
    };
})(AddMachineTypeView);

export default AddMachineTypeView;
