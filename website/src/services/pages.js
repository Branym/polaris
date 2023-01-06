import axios from "axios";
import { BASE_URL } from '../constants/app.constant';

axios.defaults.baseURL = BASE_URL;

export const viewSinglePage = (id) => {

    return new Promise(resolve => axios.post('/collections/pages/get_one?slug=' + id).then(res => {
        resolve(res.data.data.data)
    })
    .catch(err => {
        resolve({error: true})
    }))

}
