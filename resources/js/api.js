import axios from 'axios';
import router from './router'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
    responseType: 'json'
});

function getJWTToken() {
    return localStorage.getItem('JWTToken');
}

function removeJWTToken() {
    localStorage.removeItem('JWTToken');
}

export function ApiSetJWTToken(token) {
    localStorage.setItem('JWTToken', token);
}

async function checkJWTToken() {
    if(!getJWTToken()){
        return
    }
    let needRenew = false;
    await axios.get('/api/auth/checktoken/',{
        headers: {
            authorization: 'Bearer ' + getJWTToken()
        },
    })
        .catch(function (error) {
            needRenew = true;
        })
    if(needRenew){
        await axios.post('/api/auth/refresh/', {}, {
            headers: {
                authorization: 'Bearer ' + getJWTToken()
            },

        })
            .then(function (response) {
                ApiSetJWTToken(response.data.access_token)
            })
    }

}

axiosInstance.interceptors.request.use(
    async function (config) {
        await checkJWTToken()
        if (getJWTToken()) {
            config.headers.authorization = 'Bearer ' + getJWTToken()
        }
        return config
    },
    function (error) {

    }
);


export async function ApiRegisterUser(data) {
    let result = {
        error: true,
        errors: [],
    };
    await axiosInstance.post('/auth/registration/', data)
        .then(function (response) {
            console.log("register then")
            if (response.data.errors) {
                result = {
                    error: true,
                    errors: response.data.errors
                }
            } else {
                ApiSetJWTToken(response.data.access_token)
                result = {
                    error: false,
                    data: response.data
                }
            }

        })
        .catch(function (error) {
            console.log(error)
        })
    return result
}

export async function ApiLoginUser(data) {
    let result = {
        error: true,
        errors: [],
    };
    await axiosInstance.post('/auth/login/', data)
        .then(function (response) {
            if (response.data.errors) {
                result = {
                    error: true,
                    errors: response.data.errors
                }
            } else {
                ApiSetJWTToken(response.data.access_token)
                result = {
                    error: false,
                    data: response.data
                }
            }

        })
        .catch(function (error) {
            result = {
                error: true,
                errors: []
            }
        })
    return result
}

export async function ApiLogout(data) {
    console.log('ApiLogout')
    await axiosInstance.post('/auth/logout/');
    removeJWTToken()
    router.push({name: 'user.login'})
}

export async function ApiSendMessage(data) {
    let result = {
        error: true,
        errors: [],
    };
    await axiosInstance.post('/sendmessage/', data)
        .then(function (response) {
            if (response.data.errors) {
                result = {
                    error: true,
                    errors: response.data.errors,
                };
            } else {
                result = {
                    error: false,
                    errors: [],
                    message_id: response.data.message_id
                };
            }
        })
        .catch(function (response) {
            result = {
                error: true,
                errors: [],
            };
        })
    return result
}

export async function ApiRenewChat(data) {
    let result = null
    await axiosInstance.get('/renewchat/', {
        params: data
    })
        .then(function (response) {
            result = response.data
        })
        .catch(function (response) {

        });
    return result
}

export async function ApiSaveUserProfile(data) {

    let result = false;
    let formData = new FormData();
    formData.append('avatar', data.avatar);
    formData.append('name', data.name);

    await axiosInstance.post("/auth/me/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            if (response.data.errors) {
                result = {
                    error: true,
                    errors: response.data.errors,
                };
            } else {
                result = {
                    error: false,
                    errors: [],
                };
            }
        })
        .catch(function (response) {
            result = {
                error: true,
                errors: [],
            };
        });
    return result;
}

export async function ApiGetUserProfile() {
    let result = false
    await axiosInstance.get('/auth/me/')
        .then(function (response) {
            result = response.data
        })
        .catch(function (response) {
            result = false
        })
    return result
}

