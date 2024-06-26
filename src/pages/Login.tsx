// Always import from "components/ui" !
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {Link} from "react-router-dom";
import {useRef} from "react";

const LoginPage = () => {

    // Alright, we are doing to way Binding.
    // Note: "useRef" hook is used to access the HTML Elements Directly.
    // as well as their properties.
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const handleLoginSubmit = () =>
    {
        // Getting the values of "Elements"
        // Referenced by the "useRef".
        const email:any = emailRef.current?.value;
        const password:any = passRef.current?.value;

        console.log("data",{email,password})

        // Make server call.


    }




    return(
        // How to set an image as Background with blur effect.
        <div className="w-full h-screen  items-center bg-blue-400 bg- flex justify-center bg-opacity-25">
            <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
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
                    <Button onClick={handleLoginSubmit} className="w-full">Sign in</Button>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>)
}

export default LoginPage;