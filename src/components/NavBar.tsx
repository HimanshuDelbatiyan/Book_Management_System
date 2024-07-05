import {Link, useNavigate} from "react-router-dom";
import {Button} from "./ui/button.tsx";
import useTokenStore from "../Store.ts";

// @ts-ignore
const NavBar = ({showLoginModal,showRegisterModal}) =>
{
    const {token} = useTokenStore((state)=>state)

    const navigate = useNavigate()

    return(
        <nav className="border-b">
            <div className="container mx-auto flex items-center justify-between py-4">
                <div>
                    <Link to="/home">
                        <div className="flex items-center gap-1">
                            <div className="relative">
                                <img className="w-12" src="/images/NavBook.png" alt="Book"/>
                            </div>
                            <span
                                className="text-xl font-bold uppercase tracking-tight text-primary-500">Delbatiyan's Book</span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Button disabled={!!token} onClick={()=>{showLoginModal(true)}}>
                        Sign in
                    </Button>
                    <Button disabled={!!token} onClick={()=>{showRegisterModal(true)}}>
                        Sign up
                    </Button>
                    {token && <Button onClick={()=>{navigate("/dashboard/home")}}>
                        Dashboard
                    </Button>}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
