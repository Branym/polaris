import axios from "axios";
import { BASE_URL } from '../constants/app.constant';

axios.defaults.baseURL = BASE_URL;

export const viewAllOrders = (page, channel) => {

    return new Promise(resolve => axios.post('/collections/orders/get_user?channel=' + channel + '&page=' + page).then(res => {
        resolve({
            type: "Success",
            orders: res.data.data.orders.map(order => order.data),
            total: res.data.data.total
        })
    })
    .catch(err => {
        resolve({
            type: "Error",
            err: err.response.data,
            message: "Found 0 results."
        })
    }))

}

export const viewSingleOrder = (id) => {

    return new Promise(resolve => axios.post('/collections/orders/user_single?id=' + id).then(res => {
        resolve(res.data.data.data)
    })
    .catch(err => {
        resolve({})
    }))

}

export const verifyOrder = (data) => {

    return new Promise(resolve => axios.post('/products/verify_rzp', data).then(res => {
        resolve(res)
    })
    .catch(err => {
        resolve({})
    }))

}


export const sendMail = (data) => {

    return new Promise(resolve => axios.post('/collections/contact/mail', data).then(res => {
        resolve(res)
    })
    .catch(err => {
        resolve({})
    }))

}