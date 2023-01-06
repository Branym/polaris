import axios from "axios"
import {CREATE_ZONE, DELETE_ZONE,  EDIT_ZONE, GET_ZONE, GET_ZONES } from "../constants/api.constant"


export const upsertZone = (data: any, edit: boolean, id?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(edit ? EDIT_ZONE + id : CREATE_ZONE, data).then(res => {
            resolve({
                status: res.data.type,
                zones: res.data.data,
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

export const fetchZone = (code?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(GET_ZONE + code).then(res => {
            resolve({
                status: res.data.type,
                zone: res.data.data,
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

export const deleteZone = (slug: string) => {

    return new Promise((resolve, reject) => {
        axios.post(DELETE_ZONE + slug).then(res => {
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

export const fetchZones = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(GET_ZONES, {}, {params: query}).then(res => {
            resolve({
                status: res.data.type,
                data: {
                    total: res.data.data.total,
                    zones: res.data.data.shipping.map((item: any) => { return {
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



