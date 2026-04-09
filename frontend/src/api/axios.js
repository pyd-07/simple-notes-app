import axios from "axios"

const instance = axios.create({
    baseURL: "https://simple-notes-app-a7ru.onrender.com/api",
    withCredentials: true
})
export default instance