/**
 * @file Machine Type component
 * @author Yogesh Patel
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import MachineTypeView from '../presentation/machine-type';
import AddMachineTypeView from '../presentation/add-machine-type-form';
import Confirm from '../../common/confirm';
import { DELETE_MACHINE_TYPE_MSG } from '../../utils/helpers/constant';
import { addMachineType, editMachineType, deleteMachineType } from '../../reducers/machine_types';

class MachineType extends Component {
    state = {
        modalIsOpen: false,
        addMachineTypeForm: {},
        editMachineTypeId: null,
        confirmShow: false,
        deleteMachineType: null
    };

    openModal = () => {
        this.setState({ modalIsOpen: true, addMachineTypeForm: {}, editMachineTypeId: null });
    }

    editModal = (addMachineTypeForm) => {
        this.setState({ modalIsOpen: true, addMachineTypeForm, editMachineTypeId: addMachineTypeForm._id });
    }

    closeModal = (reset, resetState) => {
        this.setState({ modalIsOpen: false });
        if(reset) {
            reset();
        };
        if(resetState) {
            resetState();
        }
    }
    
	confirmClose = (deleteConfirm) => {
	    if(deleteConfirm){
	        this.state.deleteMachineType();
	    }
	    this.setState({ confirmShow: false, deleteMachineType: null });
	}
    
    confirm = (deleteMachineType) => {
        this.setState({ confirmShow: true, deleteMachineType });
    }

    render () {
        const props = {
            initialValues: { ...this.state.addMachineTypeForm },
            editMachineTypeId: this.state.editMachineTypeId,
            openModal: this.openModal,
            editModal: this.editModal,
            modalIsOpen: this.state.modalIsOpen,
            closeModal: this.closeModal,
            confirm: this.confirm,
            addMachineType: this.props.addMachineType,
            editMachineType: this.props.editMachineType,
            deleteMachineType: this.props.deleteMachineType,
            machineTypes: this.props.machineTypes
        };
            
        const confirmProps = {
            confirmShow: this.state.confirmShow,
            confirmClose: this.confirmClose,
            deleteconfMsg: DELETE_MACHINE_TYPE_MSG
        };
        
        return (
            <React.Fragment>
                <AddMachineTypeView {...props}/>
                <Confirm {...confirmProps} />
                <MachineTypeView {...props} />
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    addMachineType,
    editMachineType,
    deleteMachineType
}

const mapStateToProps = state => ({ 
    machineTypes: state.machineTypes
 });

const MachineTypeContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MachineType);

export {
    MachineTypeContainer
};
