import axios from 'axios';
import { BASE_URL } from '../constants/app.constant';

axios.defaults.baseURL = BASE_URL;

export const getCategories = () => {
    return new Promise(resolve => axios.post('/collections/category/get_categories', {}).then(res => {
        resolve(res.data.data.category.map(item => item.data))
    }))
}

export const getChannels = () => {
    return new Promise(resolve => axios.post('/collections/channels/get_active_channels', {}).then(res => {
        resolve(res.data.data.channels.map(item => item.data))
    }))
}



export const getUserProfile = () => {
    if(localStorage.getItem('token')){
        axios.defaults.headers.common['x-token'] = localStorage.getItem('token');
        return new Promise(resolve => axios.post('/collections/customers/get_user_profile', {}).then(res => {
            resolve({
                type: "Success",
                account: res.data.data.data,
                message: "Found"
            })
        }).catch(err => {
            resolve({
                type: "Error",
                account: [],
                message: "Not Found"
            })
        }))

    }
}

export const createUserProfile = (profile) => {
    if(localStorage.getItem('token')){
        axios.defaults.headers.common['x-token'] = localStorage.getItem('token');
        return new Promise(resolve => axios.post('/collections/customers/create_profile', profile).then(res => {
            resolve(res.data.data.data)
        }))

    }
}

export const editUserProfile = (data) => {
    return new Promise(resolve => axios.post('/collections/customers/edit_profile', data).then(res => {
        resolve({
            type: "Success",
            message: "Details Updated Successfully.",
            meta: res
        })
    }).catch(err => {
        resolve({
            type: "Error",
            message: err.response.data.message,
            meta: err.response
        })
    }))
}

export const editPassword = (data) => {
    return new Promise(resolve => axios.patch('/auth/update/password', data).then(res => {
        resolve({
            type: "Success",
            message: "Password Changed Successfully.",
            meta: res
        })
    }).catch(err => {
        resolve({
            type: "Error",
            message: err.response.data.message,
            meta: err
        })
    }))
}

export const forgotPassword = (data, type) => {
    return new Promise(resolve => axios.post('/auth/password/' + type, data).then(res => {
        resolve({
            type: "Success",
            message: res.data.message,
            meta: res
        })
    }).catch(err => {
        console.log(err.response)
        resolve({
            type: "Error",
            message: err.response.data.message,
            meta: err
        })
    }))
}


export const login = (email, password, signUp=false, profile={}) => {
    return new Promise(resolve => axios.post('/auth/' + (signUp ? 'signup' : 'signin'), {email,password}).then(async res => {
        localStorage.setItem('token', res.data.data.token);
        if(signUp){
            const account = await createUserProfile(profile);
            resolve({
                type: "Success",
                account: account,
                message: "Signed Up Successfully."
            })
        }
        else{
            const account = await getUserProfile();
            resolve({
                type: "Success",
                account: account.account,
                message: "Logged In Successfully."
            })
        }
    }).catch(err => {
        resolve({
            type: "Error",
            errors: err.response.data.errors,
            message: err.response.data.message
        })
    }))
}