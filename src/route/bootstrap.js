import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { DefaultLayoutComponent } from '../layout';
import { NotFound } from '../layout/presentation';

class BootstrapView extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <DefaultLayoutComponent />
                    <Route key='NOT_FOUND' exact path={'/not-found'} component={NotFound} />
                    <Redirect to='/not-found' />
                </Switch>
            </BrowserRouter>
        );
    }
}

export {
    BootstrapView
};
