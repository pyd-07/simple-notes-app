import mongoose from "mongoose"
import "dotenv/config"

import { userSchema, notesSchema } from "./schema.js"

export const User = mongoose.model("User", userSchema)
export const Notes = mongoose.model("Notes", notesSchema)

export default async function connectDB() {
    console.log("Connecting to DB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connection to DB successful!")
}

connectDB().catch(err => console.error(err))