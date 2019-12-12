
import {fetch_headers} from '../_constants/fetch_haders';
import {configs} from '../config';
import { authHeader } from '../_helpers'; //Проверка токена и т.д.
import { history } from '../_helpers';

export const userService = {
    login,
    logout,
    Fetch_Clients,  
    ApproveProjectRequest,
    refreshToken
};

function ApproveProjectRequest(clID,depID,phoneNumber){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ "clID": clID, "depID": depID, "phoneNumber": phoneNumber })
    }
    return new Promise(function(resolve, reject) {
        fetch(`${configs.apiUrl}/approvecard`, requestOptions)
            .then(handleResponse)
            .then(function (response){ 
                resolve(response);
            })
            .catch(function(error) { 
                reject(error); 
            });
    });
}


function Fetch_Clients(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return new Promise(function(resolve, reject) {
        fetch(`${configs.apiUrl}/getclients`, requestOptions)
            .then(handleResponse)
            .then(function (response){ 
                resolve(response);
            })
            .catch(function(error) {
                reject(error); 
            });
    });
};
function login(email, password ) {    
    return new Promise(function(resolve, reject) {
        const requestOptions = {
            method: 'POST',
            headers: fetch_headers,
            body: JSON.stringify({ "email": email, "password": password })
        };
        fetch(`${configs.apiUrl}/signin`, requestOptions)
        .then(handleResponse)
        .then(function (response){  
            localStorage.setItem('user', JSON.stringify(response));
            resolve(response);
        })
        .catch(function(error) { 
            reject(error); 
        });
    });
}

function refreshToken(){
    const requestOptions = {
        method: 'GET',
        headers:  authHeader(true)
    }
    return new Promise(function(resolve, reject) {
        fetch(`${configs.apiUrl}/refresh`, requestOptions)
            .then(function (response){ 
                response.text().then(text => {
                    let token=JSON.parse(text);
                    if (token.expired) {
                        logout(); 
                        location.reload(true);
                    } else {
                        localStorage.setItem('user', JSON.stringify(token));      
                    }
                    return;
                });                
                resolve(response);
            })
            .catch(function(error) {
                reject(error); 
            });
    });
}

function handleResponse(response) { 
    return response.text().then(text => {
        let data = JSON.parse(text);
        if (!response.ok) {
            if (data.expired) return refreshToken().then(function(isRefresh) {
                                        //Токен успешно обновился
                                        if (isRefresh.ok) { 
                                            return Promise.reject({"isRefresh": true});  
                                        }
                                        else  {
                                        //Ошибка обновления токена
                                            return Promise.reject(isRefresh); 
                                        }
                                    }).catch(function(error){
                                        return Promise.reject(error); 
                                    }); 
            else if (response.status==401){
                logout();
            }             
            return Promise.reject(data);
        }            
        return data;
    });
}

function logout() {
    localStorage.removeItem('user');
}