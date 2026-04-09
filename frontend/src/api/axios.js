import axios from "axios"

const instance = axios.create({
    baseURL: import.meta.env.PROD ? "/api" : import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
})
export default instance
