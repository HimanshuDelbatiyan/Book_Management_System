import {useQuery} from "@tanstack/react-query";
import { getBooksAll} from "../http/api.ts";
import {useState} from "react";
import {Book} from "../types.ts";
import BookCard from "./BookCard.tsx";
import {Pagination, PaginationContent, PaginationItem} from "./ui/pagination.tsx";
import {Button} from "./ui/button.tsx";
import {LoaderCircle} from "lucide-react";

const BookList = () =>
{
    //@ts-ignore
    const [page,setPage] = useState(1)

    const query = useQuery({queryKey:["getAll",page],queryFn:async ()=> {return getBooksAll(page)}})

    
    if(query.isError)
    {
        return (<div>{query.error.message}</div>);
    }

    const previousPage = () =>
    {
        if(page === 1)
        {
            return;
        }
        else {
            setPage(page - 1)
        }
    }

    const nextPage = () =>
    {
        setPage(page + 1)
    }

    return (
    <>
        {query.isLoading && <div className={"flex items-center justify-center font-bold"}>...Loading <LoaderCircle className={"animate-spin font-bold ml-2"}/></div>}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto mb-10">
            {
                // .map is an array method which will run a function for each element.
                query.data?.data.map((book: Book) => {
                    // Make sure we use the return statement with the "map"
                    // Don't worry return will not end the function
                    // Map run the function for each element in the array.
                    return <BookCard key={book._id} book={book}/>
                })
            }
        </div>
        <div className={"mb-4"}>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Button onClick={previousPage}>Previous</Button>
                    </PaginationItem>
                    <PaginationItem className={"ml-6 mr-6"}>
                                <span
                                    className={"px-4 py-2 rounded-md border-solid border-2 border-indigo-600"}>{page}</span>
                    </PaginationItem>
                    <PaginationItem>
                        <Button onClick={nextPage}>Next</Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </>
)}

export default BookList
