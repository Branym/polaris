import axios from "axios";
import { BASE_URL } from '../constants/app.constant';

axios.defaults.baseURL = BASE_URL;

export const renderProduct = (slug, channel) => {

    return new Promise(resolve => {
        axios.get('/products/' + channel + '/' + slug).then(result => {
            resolve({
                message: "Found.",
                product: result.data.data,
                type: "success"
            })
        }).catch(err => {
            resolve({
                message: "Not Found.",
                type: "error",
                error: err
            })
        })
    }) 

}

export const fetchProducts = (channel, query) => {

    if(!["IND", "USA"].includes(channel)){
        return
    }

    return new Promise(resolve => {
        axios.get('/products/' + channel, {params: query}).then(result => {
            resolve({
                message: "Found.",
                data: result.data.data.products,
                total: result.data.data.total,
                type: "success"
            })
        }).catch(err => {
            resolve({
                message: "Not Found.",
                type: "error",
                error: err
            })
        })
    }) 

}

export const uploadMedia = (file) => {

    var formdata = new FormData();
    formdata.append("file", file, file.name);

    return new Promise((resolve) => {
        axios.post('/products/upload', formdata).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log(err)
        })
    })

}

