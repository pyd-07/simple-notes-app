import { useEffect, useState } from "react"
import { getNotes, deleteNote } from "../api/notes"
import NotesCard from "./NotesCard"

export default function NotesGrid(){
    const [notes, setNotes] = useState([])

    useEffect(()=>{
        const fetchNotes = async () => {
        const res = await getNotes()
        setNotes(res.data.notes)
        }
        void fetchNotes()
    }, [])

    async function handleDelete(id) {
        try {
            await deleteNote(id)
            setNotes((notes)=>notes.filter(
                (n) => n._id !== id
            ))
        } catch {
            alert("Could not delete note. Try Again Later!")
        }
    }

    return (
        <div className="flex gap-5 flex-wrap justify-around">
            {notes.map((note)=>(
                <NotesCard 
                    key={note._id}
                    note={note}
                    onDelete={()=> handleDelete(note._id)}
                />
            ))}
        </div>
    )

}
