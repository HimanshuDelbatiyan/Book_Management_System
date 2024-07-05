import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar.tsx";
import Banner from "../components/Banner.tsx";
import Footer from "../components/Footer.tsx";
import LoginPage from "../pages/Login.tsx";
import RegisterPage from "../pages/Register.tsx";
import {useState} from "react";

const HomeLayout = () =>
{

    const [showLoginModal,setLoginModal] = useState(false);
    const [showRegisterModal,setRegisterModal] = useState(false);

    return(<>
           <NavBar showLoginModal={setLoginModal} showRegisterModal={setRegisterModal}/>
           <Banner/>
            <Outlet/>
           <Footer/>
           {showLoginModal && <LoginPage setLoginModal={setLoginModal}/>}
           {showRegisterModal && <RegisterPage showRegisterModal={setRegisterModal}/>}
    </>
   )
}
export default HomeLayout