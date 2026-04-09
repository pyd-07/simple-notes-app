import { Button, Card } from "@chakra-ui/react"


export default function NotesCard({note, onDelete}){

    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                <Card.Title mt="2">{note.title}</Card.Title>
                <Card.Description>
                    {note.desc}
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button 
                    variant={"surface"} color={"red.400"}
                    onClick={onDelete}
                >   Delete Note
                </Button>
            </Card.Footer>
        </Card.Root>
    )
}
