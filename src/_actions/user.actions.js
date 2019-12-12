import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
// import { history } from '../_helpers';


export const userActions = {
    login,
    logout,
    getClients
};

function login(email, password ) {   
    return dispatch => {
        dispatch(request({ email }));
        userService.login(email, password )
            .then(
                user => {                            
                    dispatch(success(user));                    
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user } 
    }
    function failure(error) {        
        return { type: userConstants.LOGIN_FAILURE, error } 
    }
}



function getClients(){
    return dispatch => {

        userService.Fetch_Clients().then((response) => {
            dispatch(fetchOffersSuccess(response));
        })
        .catch((err) => {                      
            if (err.isRefresh) {
                dispatch(getClients());
            } else {
                dispatch(alertActions.error(err))
                dispatch(fetchOffersError(err))
            }
        });
    }

    function fetchOffersSuccess(clients) {
        return {
            type: "GOT_IT",
            clients: clients
        };
    }
    
    function fetchOffersError(error) {
        return {
            type: "DID_NOT_GET_IT",
            clients: error
        };
    }

}

function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}
