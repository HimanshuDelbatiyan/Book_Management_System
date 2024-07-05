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

export const getBooks = async (page:number) => {

    return await api.get(`/api/books/specific?page=${page}`)
}

export const getBooksAll = async (page:number) => {

    return await api.get(`/api/books/?page=${page}`)
}


export const createBook = async (data:FormData) =>
{

    return await api.post("/api/books",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}

export const updateBook = async (data:any) => {

    return await api.patch(`/api/books/${data.id}`, data.formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
}

export const deleteBook = async (bookId:string) =>
{
    return await api.delete(`/api/books/${bookId}`);
}

export const singleBook = async (bookId:string) =>
{
    return await api.get(`/api/books/${bookId}`)
}