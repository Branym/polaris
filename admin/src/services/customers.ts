import axios from "axios"
import {VIEW_CUSTOMERS, VIEW_MY_PROFILE, VIEW_PROFILE } from "../constants/api.constant"

export const fetchAdminProfile = () => {

    return new Promise((resolve, reject) => {
        axios.post(VIEW_MY_PROFILE).then(res => {
            resolve({
                status: res.data.type,
                user: res.data.data.data,
                message: res.data.message
            })
        }).catch(err => {
            reject({
                status: "danger",
                message: err.response.data.message,
                errors: err.response.data.errors
            })
        })
    })

}

export const fetchProfile = (id?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(VIEW_PROFILE + id ).then(res => {
            resolve({
                status: res.data.type,
                customer: res.data.data,
                message: res.data.message
            })
        }).catch(err => {
            reject({
                status: "danger",
                message: err.response.data.message,
                errors: err.response.data.errors
            })
        })
    })

}

export const fetchCustomers = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(VIEW_CUSTOMERS, {}, {params: query}).then(res => {
            resolve({
                status: res.data.type,
                data: {
                    total: res.data.data.total,
                    customers: res.data.data.customers.map((item: any) => { return {
                        ...item.data
                    }})
                },
                message: res.data.message
            })
        }).catch(err => {
            console.log(err)
        })
    })
   
}



