import express from "express"
import bcrypt from "bcryptjs"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import cors from "cors"
import { signInObject, signUpObject, createnotesObject, updateNotesObject } from "./schema.js"
import connectDB from "./db.js"
import { User, Notes } from "./db.js"
import authMiddleware from "./middleware.js"

const app = express()

app.use(cors({
    origin: process.env.ENVIRONMENT ==="production" ? "https://simple-notes-app-tau-ten.vercel.app" : "http://localhost:5173",
    methods: ["GET","POST","PATCH","DELETE"],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())


// * signup route *
app.post("/api/v1/signup", async (req, res)=>{
    const validate = signUpObject.safeParse(req.body)
    if (!validate.success){
        return res.status(400).json({
            error: validate.error.issues
        })
    }
    const {name, email, password } = validate.data
    
    const result = await User.findOne({
        email: email
    })
    if (result) {
        return res.status(409).json({
            error: "User already exists!"
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    const UID = user.id
    const token = jwt.sign({
        id: UID
    }, process.env.JWT_SECRET)

    res.cookie("sessionID", token, {
        maxAge: 7*24*60*60*1000, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    res.status(200).json({
        message: "Sign Up Successful"
    })
    
})

// * signin route *
app.post("/api/v1/signin", async (req, res)=>{
    const validate = signInObject.safeParse(req.body)
    if (!validate.success){
        return res.status(400).json({
            error: validate.error.issues
        })
    }
    const {email, password } = validate.data
    
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        return res.status(409).json({
            error: "User doesn't exists!"
        })
    }
    const result = bcrypt.compareSync(password, user.password)
    if (!result){
        return res.status(409).json({
            error: "User doesn't exists!"
        })
    }

    const UID = user.id
    const token = jwt.sign({
        id: UID
    }, process.env.JWT_SECRET)

    res.cookie("sessionID", token, {
        maxAge: 7*24*60*60*1000, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "none" 
    })

    res.status(200).json({
        message: "Sign In Successful"
    })
    
})

// * post Note *
app.post("/api/v1/notes", authMiddleware, async (req, res)=>{
    const validate = createnotesObject.safeParse(req.body)
    if (!validate.success){
        return res.status(400).json({
            error: validate.error.issues
        })
    }
    const {title, desc} = validate.data
    await Notes.create({
        userId: req.userId,
        title,
        desc
    })
    res.status(200).json({
        message: "Note Created Successfully"
    })
})

// * get Notes * 
app.get("/api/v1/notes", authMiddleware, async (req, res) => {
    const notes = await Notes.find({
        userId: req.userId
    })
    res.status(200).json({
        notes
    })
})

// * delete Note * 
app.delete("/api/v1/notes/:id", authMiddleware, async (req, res)=>{
    const NotesId = req.params.id
    const note =  await Notes.findOne({
        _id: NotesId,
        userId: req.userId,
    })
    if(!note){
        return res.status(404).json({
            error: "Note Not Found"
        })
    }
    await Notes.findByIdAndDelete(NotesId)
    res.status(200).json({
        message: "Note Deleted Successfully"
    })
})

// * update Note * 
app.patch("/api/v1/notes/:id", authMiddleware, async (req, res) => {
    const NotesId = req.params.id
    const validate = updateNotesObject.safeParse(req.body)

    if (!validate.success){
        return res.status(400).json({
            error: validate.error.issues
        })
    }

    const {title, desc} = validate.data

    if (!(title || desc)){
        return res.status(400).json({
            error: "Atleast one updatable field must be present"
        })
    }

    const note =  await Notes.findOne({
        _id: NotesId,
        userId: req.userId
    })
    if (!note) {
        return res.status(404).json({
            error: "Note Not Found"
        })
    }
    if (title && desc){
        await Notes.findByIdAndUpdate(NotesId, {
            title,
            desc
        })
    } else if (title) {
        await Notes.findByIdAndUpdate(NotesId, {
            title
        })
    } else {
        await Notes.findByIdAndUpdate(NotesId, {
            desc
        })
    }
    
    res.status(200).json({
        message: "Note Updated Successfully"
    })
})

app.listen(process.env.PORT || 8080 , ()=>{
    console.log("App is listening on Port 8080")
})
