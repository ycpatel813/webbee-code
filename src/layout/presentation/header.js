import React from 'react';

const HeaderView = () => {
    return (
        <nav className='navbar navbar-expand navbar-light topbar static-top'>

            <button id='sidebarToggleTop' className='btn btn-link d-md-none rounded-circle mr-3'>
                <i className='fa fa-bars'></i>
            </button>

            <ul className='navbar-nav ml-auto'>

            </ul>

        </nav>
    );
};

HeaderView.propTypes = {};

export default HeaderView;
