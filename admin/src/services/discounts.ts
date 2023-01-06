import axios from "axios"
import {CREATE_DISCOUNT, DELETE_DISCOUNT, EDIT_DISCOUNT, GET_DISCOUNT, GET_DISCOUNTS } from "../constants/api.constant"


export const upsertDiscount = (data: any, edit: boolean, id?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(edit ? EDIT_DISCOUNT + id : CREATE_DISCOUNT, data).then(res => {
            resolve({
                status: res.data.type,
                discount: res.data.data,
                message: res.data.message
            })
        }).catch(err => {
            reject({
                status: "danger",
                message: err?.response?.data?.message,
                errors: err?.response?.data?.errors
            })
        })
    })

}

export const fetchDiscount = (code?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(GET_DISCOUNT + code).then(res => {
            resolve({
                status: res.data.type,
                discount: res.data.data,
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

export const deleteDiscount = (code: string) => {

    return new Promise((resolve, reject) => {
        axios.post(DELETE_DISCOUNT + code).then(res => {
            resolve({
                status: res.data.type,
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

export const fetchDiscounts = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(GET_DISCOUNTS, {}, {params: query}).then(res => {
            resolve({
                status: res.data.type,
                data: {
                    total: res.data.data.total,
                    discounts: res.data.data.discounts.map((item: any) => { return {
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



