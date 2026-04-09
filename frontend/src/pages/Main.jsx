import CreateNoteForm from "../components/NotesForm";
import NotesGrid from "../components/NotesGrid";

export default function main(){
    return (
        <div className="flex flex-col gap-10">
            <div>
                <CreateNoteForm />
            </div>
            <hr />
            <div>
                <NotesGrid />
            </div>
        </div>
    )
}