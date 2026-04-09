import { Button, Card, Field, Input, Stack } from "@chakra-ui/react"
import { createNote } from "../api/notes"
import { useState } from "react"

export default function CreateNoteForm(){
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try {
            await createNote({title, desc})
            refreshPage()
            
        } catch (err){
            console.error(err)
        }

        e.target.reset()
    }

    return (
        <div className="flex justify-around">
            <form onSubmit={handleSubmit}>
                <Card.Root minW="sm" maxW="lg">
                    <Card.Header>
                        <Card.Title>Add Note</Card.Title>
                        <Card.Description>
                            Fill the details to add the Note
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                    <Stack gap="4" w="full">
                        <Field.Root>
                            <Field.Label>Title</Field.Label>
                            <Input 
                                placeholder="Title"
                                onChange={(e)=>setTitle(e.target.value)}
                                required
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Description</Field.Label>
                            <Input 
                                placeholder="Description"
                                onChange={(e)=>setDesc(e.target.value)}
                                required
                            />
                        </Field.Root>
                    </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Button variant="solid" type="submit">Add Note</Button>
                    </Card.Footer>
                </Card.Root>
            </form>
        </div>
    )
}

function refreshPage(){
    window.location.reload()
}