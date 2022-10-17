import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import machineTypes from './machine_types';
import machines from './machines';

export default (history) => combineReducers({
    router: connectRouter(history),
    machineTypes,
    machines,
    form: formReducer
});
