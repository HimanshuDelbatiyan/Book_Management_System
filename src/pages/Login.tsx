// Always import from "components/ui" !
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {Link} from "react-router-dom";

const LoginPage = () => {
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
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
            </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full">Sign in</Button>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/login" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>)
}

export default LoginPage;