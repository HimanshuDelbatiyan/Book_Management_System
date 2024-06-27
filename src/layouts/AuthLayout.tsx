import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useTokenStore from "../Store.ts";

const AuthLayout = () => {
    const navigate =  useNavigate()
    const token = useTokenStore((state)=>state.token)

    // Note: useEffect() is a Synchronous Function
    // But
    useEffect(()=>{
        if(token)
        {
            return navigate('/dashboard/home');
        }
    })
    return(<>
        <Outlet/>
    </>)
}
export default AuthLayout