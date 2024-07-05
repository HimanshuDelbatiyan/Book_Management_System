// Always import from "components/ui" !
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {login} from "../http/api.ts";
import { useNavigate } from "react-router-dom";
import {LoaderCircle, X} from "lucide-react";
import useTokenStore from "../Store.ts"

// @ts-ignore
const LoginPage = ({setLoginModal}) => {

    // Note: "useRef" hook is used to access the HTML Elements Directly.
    // as well as their properties.
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    // Using the "useNavigation" hook to navigate between the Routes.
    const navigate = useNavigate()


    // Using the Global State Object for managing the state of the application.
    const setToken = useTokenStore((state)=> state.setToken)
    const token = useTokenStore((state)=> state.token)


    /**
     * Using the "useMutation" hook to send the data to the server
     * This method takes an Options Object with some properties specified and
     * return a instance which is used to send the data to the server.
     */
    const mutation = useMutation({
        mutationFn:login,
        // Argument is response from the server.
        onSuccess:  (response) =>
        {
            console.log(response)
            setToken(response.data.accessToken)
            console.log(token)
            navigate("/dashboard/home")
        }
    })


    const handleLoginSubmit = () =>
    {
        // Getting the values of "Elements"
        // Referenced by the "useRef".
        const email:any = emailRef.current?.value;
        const password:any = passRef.current?.value;

        const data = {
            email,
            password
        }

        if(!email || !password)
        {
            return alert("Please enter email and password")
        }

        // Send the data to the client
        mutation.mutate(data)

    }

    return(
        // How to set an image as Background with blur effect.
        <div className="fixed inset-0  items-center flex justify-center bg-opacity-30 backdrop-blur-sm">
            <div>
                <div className={"text-end"}>
                    <button onClick={()=>{setLoginModal(false)}} className='mb-2 hover:bg-black hover:text-white hover:rounded-md'><X/></button>
                </div>
                <div>
                    <Card className="w-100 p-4 font-bold font-3xl max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription className={"flex flex-col"}>
                            Enter your email below to login to your account.
                            {mutation.isError && <span className={" text-center text-md font-bold mt-2 text-red-800"}>{mutation.error.message}</span>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            {/*------------>
                                We are doing "Two-Way Binding" Here.
                            */}
                            <Input id="email" ref={emailRef}
                             type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" ref={passRef} name="password" type="password" required />
                        </div>
                    </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button onClick={handleLoginSubmit} className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending && <span className={"animate-spin"}> <LoaderCircle/> </span>}
                                <span className={"ml-2"}>Sign in</span>
                            </Button>
                            {/*<div className="mt-4 text-center text-sm">*/}
                            {/*    Don't have an account?{" "}*/}
                            {/*    <Link to="/auth/register" className="underline">*/}
                            {/*        Sign up*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>)
}

export default LoginPage;