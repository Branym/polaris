import axios from "axios"
import {LOGIN } from "../constants/api.constant"

export const login = (email: string, password: string) => {

    return new Promise((resolve, reject) => {
        axios.post(LOGIN, {email, password}).then(res => {
            resolve({
                status: res.data.type,
                token: res.data.data.token,
                account: res.data.data.account,
                message: res.data.message
            })
        }).catch(err => {
            console.log(err)
            reject({
                status: "danger",
                message: err.response.data.message,
                errors: err.response.data.errors
            })
        })
    })

}



