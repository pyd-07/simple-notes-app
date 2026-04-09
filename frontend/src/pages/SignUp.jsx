import { Button, Card, Field, Input, Stack } from "@chakra-ui/react"
import { signUpUser } from "../api/auth"
import { useState } from "react"
import { useNavigate , Link} from "react-router-dom"


export default function SignUp(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()

        try{
            if (!name || !email || !password){
                alert("All Fields are Required")
                return
            }
            await signUpUser({name, email, password})
            navigate("/notes")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <form onSubmit={handleSignUp}>
                <Card.Root minW="md">
                    <Card.Header>

                        <Card.Title>Sign Up</Card.Title>

                        <Card.Description>
                            Fill in the form below to create an account
                        </Card.Description>

                    </Card.Header>

                    <Card.Body>
                        <Stack gap="4" w="full">
                            <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input 
                                placeholder="Name"
                                onChange={(e)=>setName(e.target.value)}
                                required={true}
                            />
                            </Field.Root>

                            <Field.Root>
                            <Field.Label>Email</Field.Label>
                            <Input
                                placeholder="Email" 
                                onChange={(e)=>setEmail(e.target.value)}
                                required={true}
                            />
                            </Field.Root>

                            <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input 
                                type="password"
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                                required={true}
                            />
                            </Field.Root>
                            
                        </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent="flex-end">
                        <Link to={"/signin"}>
                            <Button variant="outline">
                                Sign In
                            </Button>
                        </Link>
                        <Button variant="solid" type="submit">Sign Up</Button>
                    </Card.Footer>
                </Card.Root>
            </form>
        </div>
        
    )
}