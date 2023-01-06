import axios from "axios"
import {COUNT_ORDER, EDIT_ORDER, GET_ORDERS, GET_SALES, VIEW_ORDER } from "../constants/api.constant"


export const fetchOrder = (id?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(VIEW_ORDER + id ).then(res => {
            resolve({
                status: res.data.type,
                order: res.data.data.data,
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

export const editOrder = (id: string, payload: any) => {

    return new Promise((resolve, reject) => {
        axios.post(EDIT_ORDER + id, payload).then(res => {
            resolve({
                status: res.data.type,
                message: res.data.message
            })
        }).catch(err => {
            resolve({
                status: "danger",
                message: err.response.data.message,
                errors: err.response.data.errors
            })
        })
    })

}

export const countOrders = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(COUNT_ORDER, {}, {params: query}).then((res: any) => {
            resolve({
                status: res.data.type,
                count: res.data.data.length === 0 ? 0 : res.data.data[0].count,
                message: res.data.message
            })
        }).catch(err => {
            console.log(err)
        })
    })
   
}

export const getSales = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(GET_SALES, {}, {params: query}).then((res: any) => {
            console.log(res.data.data[0].sales)
            resolve({
                status: res.data.type,
                sales: res.data.data.length === 0 ? 0 : res.data.data[0].sales,
                message: res.data.message
            })
        }).catch(err => {
            console.log(err)
        })
    })
   
}

export const fetchOrders = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(GET_ORDERS, {}, {params: query}).then(res => {
            resolve({
                status: res.data.type,
                data: {
                    total: res.data.data.total,
                    orders: res.data.data.orders.map((item: any) => { return {
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





