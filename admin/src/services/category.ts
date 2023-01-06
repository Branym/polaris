import axios from "axios"
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORIES } from "../constants/api.constant"


interface Category {
    title: string,
    slug: string,
    description: string,
    bg_image: string
}

export const upsertCategory = (data: Category, edit: boolean, id?: string) => {

    return new Promise((resolve, reject) => {
        axios.post(edit ? EDIT_CATEGORY + id : CREATE_CATEGORY, data).then(res => {
            resolve({
                status: res.data.type,
                product: res.data.data,
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

export const deleteCategory = (slug: string) => {

    return new Promise((resolve, reject) => {
        axios.post(DELETE_CATEGORY + '?slug=' + slug).then(res => {
            resolve({
                status: res.data.type,
                product: res.data.data,
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

export const fetchCategories = async (query?: any) => {

    return new Promise((resolve) => {
        axios.post(GET_CATEGORIES, {}, {params: query}).then(res => {
            resolve({
                status: res.data.type,
                data: {
                    total: res.data.data.total,
                    categories: res.data.data.category.map((item: any) => { return {
                        title: item.data.title, 
                        slug: item.data.slug,
                        description: item.data.description,
                        bg_image: item.data.bg_image
                    }})
                },
                message: res.data.message
            })
            localStorage.setItem('cbx_categories', JSON.stringify(res.data.data.category.map((item: any) => { return {
                title: item.data.title, 
                slug: item.data.slug,
                description: item.data.description,
                bg_image: item.data.bg_image
            }})))
        }).catch(err => {
            console.log(err)
        })
    })
   
}

export const getCategories = () => {
    const _c:any = localStorage.getItem('cbx_categories');
    return JSON.parse(_c)
}


