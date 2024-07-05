import {Card, CardContent, CardDescription,  CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {register} from "../http/api.ts";
import {LoaderCircle, X} from "lucide-react";
import useTokenStore from "../Store.ts";
import {useNavigate} from "react-router-dom";

//@ts-ignore
const RegisterPage = ({showRegisterModal}) =>
{

    // Using the "useRef" to manipulate the HTML elements directly.
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const navigate =  useNavigate();

    const setToken = useTokenStore((state)=> state.setToken)



    // Creating the mutation instance which contains various methods and properties
    const mutation = useMutation({
        mutationFn:register,
        onSuccess: (response) =>
        {
            setToken(response.data.accessToken)
            navigate("/dashboard/home")
        }
    })


    const RegisterUser = () =>
    {
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;


        if(!name || !email || !password)
        {
            return alert("None of the field can be left empty")
        }

        mutation.mutate({name,email,password})


    }







    return (
        <div className="fixed inset-0  items-center flex justify-center bg-opacity-30 backdrop-blur-sm">
            <div>
                <div className={"text-end"}>
                    <button onClick={()=>{showRegisterModal(false)}} className='mb-2 hover:bg-black hover:text-white hover:rounded-md'><X/></button>
                </div>
                <div>
                    <Card className="w-100 p-4 font-bold font-3xl max-w-md">
                        <CardHeader>
                            <CardTitle className="text-xl">Sign Up</CardTitle>
                            <CardDescription>
                                Enter your information to create an account
                                <br></br>
                                {mutation.isError && <span
                                    className={"text-red-800 text-center font-bold"}>{mutation.error.message}</span>}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input ref={nameRef} id="name" placeholder="Max" required={true}/>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        ref={emailRef}
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required={true}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input ref={passwordRef} id="password" type="password"/>
                                </div>
                                <Button onClick={RegisterUser} type="submit" className="w-full"
                                        disabled={mutation.isPending}>
                                    {mutation.isPending && <span className={"animate-spin"}> <LoaderCircle/> </span>}
                                    <span className={"ml-2"}>Create an account</span>
                                </Button>
                            </div>
                            {/*<div className="mt-4 text-center text-sm">*/}
                            {/*    Already have an account?{" "}*/}
                            {/*    <Link to="/auth/login" className="underline">*/}
                            {/*        Sign in*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>)
}
export default RegisterPage