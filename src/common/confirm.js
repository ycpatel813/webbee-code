
import React from 'react';
import Modal from 'react-bootstrap-modal';
import PropTypes from 'prop-types';

import { CANCELBTN, YESBTN } from '../utils/helpers/constant.js';

export default class Confirm extends React.Component {
    render () {
        const { confirmShow, confirmClose, deleteconfMsg } = this.props;
        
        return(
            	
            <Modal show={confirmShow} onHide={() => confirmClose(false)} animation={false}>
                <Modal.Body>{ deleteconfMsg }</Modal.Body>
                <Modal.Footer>
                    <button type='button'
                        className='btn btn-sm btn-outline-info ml-1'
                        onClick={() => confirmClose(false)}
                        title='close'>
                        { CANCELBTN }
                    </button>
                    <button type='button'
                        className='btn btn-sm btn-outline-danger ml-1'
                        onClick={() => confirmClose(true)}
                        title='close'>
                        { YESBTN }
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
Confirm.propTypes = {
    show: PropTypes.bool,
    confirmClose: PropTypes.func,
    confirmShow: PropTypes.bool,
    deleteconfMsg: PropTypes.string
};
