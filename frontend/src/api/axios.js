import axios from "axios"

const instance = axios.create({
    baseURL: "https://simple-notes-app-a7ru.onrender.com",
    withCredentials: true
})
export default instance