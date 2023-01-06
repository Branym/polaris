import axios from "axios"
import {CREATE_PAGE, DELETE_PAGE, EDIT_PAGE, GET_PAGE, GET_PAGES } from "../constants/api.constant"


interface Page {
    title: string,
    slug: string,
    description: string,
    bg_image: string,
    seo_description: string,
    seo_title: string
}

export const upsertPage = (data: Page, edit: boolean, id?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(edit ? EDIT_PAGE + id : CREATE_PAGE, data).then(res => {
            resolve({
                status: res.data.type,
                page: res.data.data,
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

export const fetchPage = (slug?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(GET_PAGE + slug ).then(res => {
            resolve({
                status: res.data.type,
                page: res.data.data,
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

export const deletePage = (slug: string) => {

    return new Promise((resolve, reject) => {
        axios.post(DELETE_PAGE + '?slug=' + slug).then(res => {
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

export const fetchPages = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(GET_PAGES, {}, {params: query}).then(res => {
            resolve({
                status: res.data.type,
                data: {
                    total: res.data.data.total,
                    pages: res.data.data.pages.map((item: any) => { return {
                        title: item.data.title, 
                        slug: item.data.slug,
                        description: item.data.description,
                        bg_image: item.data.bg_image
                    }})
                },
                message: res.data.message
            })
        }).catch(err => {
            console.log(err)
        })
    })
   
}



