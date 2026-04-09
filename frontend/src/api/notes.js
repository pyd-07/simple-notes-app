import api from "./axios"

export const getNotes = () => api.get("/v1/notes")
export const createNote = (data) => api.post("/v1/notes", data)
export const deleteNote = (id) => api.delete(`/v1/notes/${id}`)
export const updateNote = (id, data) => api.patch(`/v1/notes/${id}`, data)