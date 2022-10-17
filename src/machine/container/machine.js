/**
 * @file Machine component
 * @author Yogesh Patel
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { reduxForm, formValueSelector } from 'redux-form';

import MachineView from '../presentation/machine';
import AddMachineForm from '../presentation/add-machine-form';
import Confirm from '../../common/confirm';
import { DELETE_MACHINE_MSG } from '../../utils/helpers/constant';
import { addMachine, deleteMachine } from '../../reducers/machines';

class Machine extends Component {
    state = {
        modalIsOpen: false,
        machineForm: {},
        editMachineId: null,
        confirmShow: false,
        deleteMachine: null
    };

    openModal = () => {
        this.setState({ modalIsOpen: true, machineForm: {}, editMachineId: null });
    }

    editModal = (machineForm) => {
        this.setState({ modalIsOpen: true, machineForm, editMachineId: machineForm._id });
    }

    closeModal = (reset, resetState) => {
        this.setState({ modalIsOpen: false });
        if (reset) {
            reset();
        };
        if (resetState) {
            resetState();
        }
    }

    confirmClose = (deleteConfirm) => {
        if (deleteConfirm) {
            this.state.deleteMachine();
        }
        this.setState({ confirmShow: false, deleteMachine: null });
    }

    confirm = (deleteMachine) => {
        this.setState({ confirmShow: true, deleteMachine });
    }

    render() {
        const props = {
            initialValues: { ...this.state.machineForm },
            editMachineId: this.state.editMachineId,
            openModal: this.openModal,
            editModal: this.editModal,
            modalIsOpen: this.state.modalIsOpen,
            closeModal: this.closeModal,
            confirm: this.confirm,
            addMachine: this.props.addMachine,
            deleteMachine: this.props.deleteMachine,
            machines: this.props.machines,
            machineTypes: this.props.machineTypes,
            type: this.props.type,
            handleSubmit: this.props.handleSubmit
        };

        const confirmProps = {
            confirmShow: this.state.confirmShow,
            confirmClose: this.confirmClose,
            deleteconfMsg: DELETE_MACHINE_MSG
        };

        return (
            <React.Fragment>
                <AddMachineForm {...props} />
                <Confirm {...confirmProps} />
                <MachineView {...props} />
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    addMachine,
    deleteMachine
}

const selector = formValueSelector('AddMachine');
const mapStateToProps = (state) => ({
    type: selector(state, 'type'),
    machines: state.machines,
    machineTypes: state.machineTypes
});

const MachineContainer = compose(
    withRouter,
    reduxForm({
        // a unique name for the form
        form: 'AddMachine',
        enableReinitialize: true
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(Machine);

export {
    MachineContainer
};
