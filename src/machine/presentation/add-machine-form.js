
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Modal from 'react-bootstrap-modal';

import renderField from '../../common/render_field';
import renderSelect from '../../common/render_select';
import { required, maxChar40 } from '../../utils/helpers/validate';

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

const AddMachineForm = ({
    addMachine,
    closeModal,
    editMachineId,
    handleSubmit,
    invalid,
    machineTypes,
    modalIsOpen,
    reset,
    submitting,
    type
}) => {

    const [selectedMachineType, setSelectedMachineType] = useState({});

    useEffect(() => {
        const selectedMType = machineTypes.find(machineType => machineType.type === type);
        setSelectedMachineType(selectedMType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    const saveMachineType = (data) => {
        addMachine(data);
        closeModal(reset)
    };

    const renderText = (field) => {
        return (<div className='form-group'>
            <label htmlFor={field.name}>{field.name}</label>
            <Field
                className='form-control'
                validate={[required, maxChar40]}
                name={field.name}
                component={renderField}
                type={field.value} />
        </div>);
    }

    const renderCheckBox = (field) => {
        return (<div className='d-flex align-items-end'>
            <label className='mr-4' htmlFor={field.name}>{field.name}</label>
            <Field
                className='form-control w-17'
                name={field.name}
                component={renderField}
                type={field.value} />
        </div>);
    }


    return (
        <Modal
            show={modalIsOpen}
            style={customStyles}
            backdrop='static'
            className='modal-container'
            centered>
            <form id='AddMachine' onSubmit={handleSubmit(saveMachineType)}>
                <Modal.Header>
                    <h5>
                        {editMachineId ? 'Edit Machine' : 'Add Machine'}
                    </h5>
                </Modal.Header>
                <Modal.Body>

                    <div className='form-group'>
                        <label htmlFor='type'>Machine Type</label>
                        <Field
                            className='form-control'
                            validate={[required]}
                            name='type'
                            component={renderSelect} >
                            <option value='' disabled>Machine Type</option>
                            {machineTypes.map((machineType, index) => <option key={index} value={machineType.type}>{machineType.type} </option>)}
                        </Field>
                    </div>

                    {selectedMachineType?.fields?.map((field) => {
                        switch (field.value) {
                            case 'text':
                            case 'date':
                            case 'number':
                                return renderText(field);
                            case 'checkbox':
                                return renderCheckBox(field);
                            default:
                                return null
                        }
                    })}

                </Modal.Body>
                <Modal.Footer>

                    <button className='btn btn-primary' type='submit' disabled={invalid || submitting}>
                        Save
                    </button>

                    <button type='button' className='btn btn-secondary ml-2' onClick={() => closeModal(reset)}>
                        Close
                    </button>

                </Modal.Footer>
            </form>
        </Modal>
    );
};

let AddMachineView = AddMachineForm;

AddMachineForm.propTypes = {
    addMachine: PropTypes.func,
    closeModal: PropTypes.func,
    editMachineId: PropTypes.string,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    machineTypes: PropTypes.array,
    modalIsOpen: PropTypes.func,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    type: PropTypes.string
};

export default AddMachineView;
