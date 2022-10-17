
import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../common/table';

const MachineTypeView = ({ 
    confirm, 
    deleteMachineType, 
    editModal, 
    machineTypes, 
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

        },
        {
            headerName: 'Title',
            field: 'title',
            searchable: true,
            width: '50%'

        }
    ];

    const CreateMachineTypeBtn = () => <button className='btn btn-primary' onClick={openModal}>Create Machine Type</button>

    const RowActionBarComponent = (machineType) => {
        return (<React.Fragment>
            <button type='button' className='btn btn-sm btn-outline-secondary mt-1 mr-1' title='Edit' onClick={() => editModal(machineType)}>
                <i className='fa fa-edit pointer'></i>
            </button>
            <button type='button'
                className='btn btn-sm btn-outline-danger mt-1'
                onClick={() => confirm(deleteMachineType)}
                title='Delete'>
                <i className='fa fa-trash-alt'></i>
            </button>
        </React.Fragment>);
    };

    const tableProps = {
        title: 'Machine Types',
        columns: createColumnDefs,
        rows: machineTypes,
        enableRowActionBar: true,
        rowActionBarComponent: (row) => RowActionBarComponent(row),
        createNewRecord: CreateMachineTypeBtn()
    };

    return (<Table {...tableProps} />);
};

MachineTypeView.propTypes = {
    confirm: PropTypes.func,
    deleteMachineType: PropTypes.func,
    editModal: PropTypes.func,
    machineTypes: PropTypes.array, 
    openModal: PropTypes.func,
};

export default MachineTypeView;
