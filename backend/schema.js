import { z } from "zod"
import mongoose from "mongoose"

const signInObject = z.object({
    email: z.email("Not a valid email"),
    password: z.string().min(6, "Password must contain 6 characters")
})

const signUpObject = z.object({
    name: z.string().min(3, "Name must have atleast 3 characters"),
    email: z.email("Not a valid mail"),
    password: z.string().min(6, "Password must contain 6 characters")
}) 

const createnotesObject = z.object({
    title: z.string().min(1, "Title must be present"),
    desc: z.string()
})

const updateNotesObject = z.object({
    title: z.string().min(1, "Title must be present").optional(),
    desc: z.string().optional()
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const notesSchema = new mongoose.Schema({
    userId: String,
    title: String,
    desc: String,
})

export {signUpObject, signInObject, createnotesObject, updateNotesObject, userSchema, notesSchema}