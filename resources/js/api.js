import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 1000
});

export function registerUser($email, $password, $confirmPassword){

}

export function loginUser($email, $password){

}

export function sendMessage($message){

}

export function renewChat(){
    return axiosInstance.get({
        url: '/renewchat'
    });
}
