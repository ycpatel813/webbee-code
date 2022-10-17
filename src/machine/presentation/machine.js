
import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../common/table';

const MachineView = ({ 
    confirm, 
    deleteMachine, 
    editModal, 
    machines, 
    openModal
}) => {

    const createColumnDefs = [
        {
            headerName: 'Id',
            field: 'index',
            width: '20%'
        },
        {
            headerName: 'Name',
            field: 'type',
            searchable: true,
            sortable: true,
            width: '20%'

        }
    ];

    const CreateMachineBtn = () => <button className='btn btn-primary' onClick={openModal}>Create Machine</button>

    const RowActionBarComponent = (machine) => {
        return (<React.Fragment>
            <button type='button' className='btn btn-sm btn-outline-secondary mt-1 mr-1' title='Edit' onClick={() => editModal(machine)}>
                <i className='fa fa-edit pointer'></i>
            </button>
            <button type='button'
                className='btn btn-sm btn-outline-danger mt-1'
                onClick={() => confirm(deleteMachine)}
                title='Delete'>
                <i className='fa fa-trash-alt'></i>
            </button>
        </React.Fragment>);
    };

    const tableProps = {
        title: 'Machines',
        columns: createColumnDefs,
        rows: machines,
        enableRowActionBar: true,
        rowActionBarComponent: (row) => RowActionBarComponent(row),
        createNewRecord: CreateMachineBtn()
    };

    return (
        <React.Fragment>
            <Table {...tableProps} />
        </React.Fragment>
    );

};

MachineView.propTypes = {
    confirm: PropTypes.func,
    deleteMachine: PropTypes.func, 
    editModal: PropTypes.func, 
    machines: PropTypes.array, 
    openModal: PropTypes.func
};
export default MachineView;
