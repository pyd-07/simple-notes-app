import { Button, Card, Field, Input, Stack } from "@chakra-ui/react"
import { signInUser } from "../api/auth"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"


export default function SignIn(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()

        try{
            if (!email || !password){
                alert("All Fields are Required")
                return
            }
            await signInUser({email, password})
            navigate("/notes")
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }

    return (

        <div className="grid place-items-center h-screen">
            <form onSubmit={handleSignIn}>
                <Card.Root minW="md">
                    <Card.Header>

                        <Card.Title>Sign In</Card.Title>

                        <Card.Description>
                            Fill in the form below to login to your account
                        </Card.Description>

                    </Card.Header>

                    <Card.Body>
                        <Stack gap="4" w="full">

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
                        <Link to={"/"}>
                            <Button variant="outline">
                                Sign Up
                            </Button>
                        </Link>
                        <Button variant="solid" type="submit">Sign In</Button>
                    </Card.Footer>
                </Card.Root>
            </form>
        </div>
        
    )
}