import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const SideBarView = memo(({ sidebarObj,curpath,redirectToPath }) => {
    const [sideToggled, setSideToggled] = useState('');

    const sideMenuLinks = Object.keys(sidebarObj).map(key => {
        let activeClass = false;
        
        // PREVENTATION OF MULTIPLE SELECTION
        if(curpath !== '/' && sidebarObj[key].pathname !== '/') {
            activeClass = Boolean(curpath.includes(sidebarObj[key].pathname));
        } else {
            activeClass = Boolean(sidebarObj[key].pathname === (curpath));
        }
        
        return(<li className={`nav-item${activeClass ? ' active': ''}` } key={key}>
            <span onClick= { () => redirectToPath(sidebarObj[key].pathname)} className='nav-link pointer' >
                <i className={`fas fa-fw ${sidebarObj[key].icon}`} ></i>
                <span>{sidebarObj[key].title}</span></span>
        </li>);
    });

    const toggleSidebar = (curState) => {
        const newClass = (curState === '') ? 'toggled' : '';
        setSideToggled(newClass);
    };

    return (
        <ul className={`navbar-nav sidebar sidebar-dark accordion  ${sideToggled}`} id='accordionSidebar'>
            <a className='sidebar-brand d-flex align-items-center justify-content-center' href='/'>
                <div className='sidebar-brand-icon rotate-n-15'>
                    <i className='fas fa-laugh-wink'></i>
                </div>
                <div className='sidebar-brand-text mx-3'> Webbee Code</div>
            </a>
            <hr className='sidebar-divider my-0' />
            {sideMenuLinks}
            <div className='text-center d-md-inline'>
                <button className='rounded-circle border-0' id='sidebarToggle' onClick={() => toggleSidebar(sideToggled)}></button>
            </div>
        </ul>
    );
});

SideBarView.propTypes = {
    sidebarObj: PropTypes.object,
    curpath: PropTypes.string,
    redirectToPath: PropTypes.func
};


export default SideBarView;
