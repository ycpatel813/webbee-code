/**
 * @file Default Layout component
 * @author Yogesh Patel
 */

import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Route, Switch, withRouter } from 'react-router-dom';

import { Header, Sidebar } from '../presentation';

const MachineTypeContainer = lazy(() => import('../../machine-type').then(module => ({ default: module.MachineTypeComponent })));
const MachineComponent = lazy(() => import('../../machine').then(module => ({ default: module.MachineComponent })));

class DefaultLayout extends Component {
    state = {
        sidebarObj: {
            machineType: { title: 'Machine Types', pathname: '/', icon: 'fa-tachometer-alt', component: MachineTypeContainer },
            machine: { title: 'Machines', pathname: '/machines', icon: 'fa-user', component: MachineComponent },
        }
    }

    redirectToPath = (path) => {
        this.props.history.push(path);
    };

    render() {
        const props = {
            sidebarObj: this.state.sidebarObj,
            curpath: this.props.history.location.pathname,
            redirectToPath: this.redirectToPath
        };

        return (

            <div id='wrapper'>
                <Sidebar {...props} />
                <div id='content-wrapper' className='d-flex flex-column'>
                    <div id='main-content'>
                        <div className='container-fluid'>

                            <div className='block-header'>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-8 col-sm-12'>
                                    </div>
                                    <div className='col-lg-6 col-md-8 col-sm-12'>
                                       <Header {...props} />
                                    </div>
                                </div>
                            </div>
                            <div className='row clearfix'>
                                <Switch>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        {
                                            Object.keys(props.sidebarObj).map((component) => {
                                                return (<Route
                                                    key={(props.sidebarObj[component].title).toLowerCase()}
                                                    exact
                                                    path={props.sidebarObj[component].pathname}
                                                    component={props.sidebarObj[component].component} />);
                                            })
                                        }
                                    </Suspense>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
DefaultLayout.propTypes = {
    redirectPath: PropTypes.string,
    sidebarObj: PropTypes.object,
    curpath: PropTypes.string,
    history: PropTypes.object
};

const DefaultLayoutContainer = compose(
    withRouter
)(DefaultLayout);

export {
    DefaultLayoutContainer
};
