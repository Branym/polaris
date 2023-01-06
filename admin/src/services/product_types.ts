import axios from "axios"
import {GET_TYPES } from "../constants/api.constant"


interface ProductType {
    name: string,
    weight: number,
    shippable: boolean,
    sub_product: string,
    sub_products: string[],
    atrributes: any[]
}

export const createProductTypes = (data: ProductType) => {

}

export const fetchProductTypes = async () => {

    const res = await axios.get(GET_TYPES)
    localStorage.setItem('cbx_types', JSON.stringify(res.data.data))
}

export const getProductTypes = () => {
    const _c:any = localStorage.getItem('cbx_types');
    return JSON.parse(_c)
}


