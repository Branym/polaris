import axios from "axios";
import { CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT, GET_PRODUCTS, UPLOAD_MEDIA } from "../constants/api.constant";


interface VariantProps {
    name: string,
    sku: string,
    media: string[],
    weight: string,
    dimension: string,
    stock: any
}

interface ProductProps {
    name?: string,
    slug?: string,
    media?: any[],
    description?: string,
    product_type?: string,
    category?: string,
    variants?: VariantProps[]
}

export const viewProducts = (query: any) => {

    return new Promise((resolve) => {
        axios.get(GET_PRODUCTS, {params: query}).then(res => {
            resolve({
                status: res.data.type,
                data: res.data.data,
                message: res.data.message
            })
        }).catch(err => {
            console.log(err)
        })
    })

}

export const viewProduct = (id: string) => {

    return new Promise((resolve) => {
        axios.get(GET_PRODUCT, {params: {id: id}}).then(res => {
            resolve({
                status: res.data.type,
                product: res.data.data,
                message: res.data.message
            })
        }).catch(err => {
            console.log(err)
        })
    })

}

export const createProduct = (data: ProductProps) => {

    return new Promise((resolve, reject) => {
        axios.post(CREATE_PRODUCT, data).then(res => {
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

export const editProduct = (data: ProductProps, id: string) => {

    return new Promise((resolve, reject) => {
        axios.post(EDIT_PRODUCT + '?id=' + id, data).then(res => {
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

export const deleteProduct = (id: string) => {

    return new Promise((resolve, reject) => {
        axios.delete(DELETE_PRODUCT + '?id=' + id).then(res => {
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

export const updateInventory = (channel: string, cart_items: any[], returned: boolean) => {

    const url = returned ? 'returns' : 'fulfilled';

    return new Promise((resolve, reject) => {
        axios.post('/products/' + channel + '/update_stock/' + url, {cart_items}).then(res => {
            resolve("Ok")
        })
    })


}

export const sendAdminMail = (to: string, data: any) => {


    return new Promise((resolve, reject) => {
        axios.post('/products/send_mail', {to, order: data}).then(res => {
            resolve("Ok")
        })
    })


}

export const uploadMedia = (file: any) => {

    var formdata = new FormData();
    formdata.append("file", file, file.name);

    return new Promise((resolve) => {
        axios.post(UPLOAD_MEDIA, formdata).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err)
        })
    })

}
