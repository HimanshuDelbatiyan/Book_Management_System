import axios from "axios";
import useTokenStore from "../Store.ts";


const api = axios.create({
    baseURL:"http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use((config) =>
{
    const token = useTokenStore.getState().token;
    if(token) {
        config.headers.Authorization =
            `Bearer ${token}`
    }
    return config
})

export const login = async (data:{email:string,password:string}) =>
{
    return await api.post("/api/users/login",data)
}

export const register = async (data:{name:string,email:string,password:string})=>
{
    return await api.post("/api/users/register",data)
}

export const getBooks = async () => {
    return await api.get("/api/books")
}

export const createBook = async (data:FormData) =>
{

    return await api.post("/api/books",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}