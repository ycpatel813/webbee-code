import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';

import { ToastContainer } from './utils/toast';
import store, { history } from './store';
import { BootstrapView } from './route';
import { ErrorBoundary } from './error_boundary';
import * as serviceWorker from './serviceWorker';
import './style/css/main.min.css';
import './style/css/custom.css';
import './style/scss/main.scss';
import '../node_modules/react-bootstrap-modal/lib/css/rbm-complete.css';

ReactDOM.render(
    <ErrorBoundary>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <ToastContainer autoClose={3000} />
                    <BootstrapView />
                </ConnectedRouter>
            </Provider>
    </ErrorBoundary>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
