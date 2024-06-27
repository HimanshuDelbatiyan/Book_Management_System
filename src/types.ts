export interface Author
{
    _id:string;
    name:string
}

export  interface Book {
    _id:string;
    title:string;
    description:string;
    genre:string;
    coverImage:string;
    file:string;
    author:Author;
    createdAt:string;
}