import {fetch_headers} from '../_constants/fetch_haders';

export function authHeader(refresh=null) {
    // return authorization header with jwt token        
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        if(refresh) return Object.assign(fetch_headers, {'Authorization': 'Bearer ' + user.refresh_token});
            else return Object.assign(fetch_headers, {'Authorization': 'Bearer ' + user.token});
    } else {
        return null;
    }
}