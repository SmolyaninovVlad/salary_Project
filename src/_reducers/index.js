import { combineReducers } from 'redux';

import {authentication} from './authentication.reducer';
import {users} from './users.reducer';
import {alert} from './alert.reducer';
import {clients} from './clients.reducer';

export const rootReducer = combineReducers({
    authentication: authentication,
    users: users,
    alert: alert,
    clients: clients
});
export default rootReducer;