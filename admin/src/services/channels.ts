import axios from "axios"
import {  GET_CHANNELS } from "../constants/api.constant"


interface Channel {
    name: string,
    slug: string,
    country: string,
    currency: string
}

export const createChannel = (data: Channel) => {

}

export const fetchChannels = async () => {

    const res = await axios.post(GET_CHANNELS)
    localStorage.setItem('cbx_channels', JSON.stringify(res.data.data.channels.map((item: any) => { return {
        name: item.data.name, 
        slug: item.data.slug,
        currency: item.data.currency,
        country: item.data.country
    }})))

}

export const getChannels = () => {
    const _c:any = localStorage.getItem('cbx_channels');
    return JSON.parse(_c)
}


