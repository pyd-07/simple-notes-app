import api from "./axios"

export const signInUser = (data) => api.post("/v1/signin", data)
export const signUpUser = (data) => api.post("/v1/signup", data)