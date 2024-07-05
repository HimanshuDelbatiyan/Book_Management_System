import {deleteBook, getBooks} from "../http/api.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "../components/ui/breadcrumb.tsx";
import {CirclePlus, LoaderCircle, MoreHorizontal, Slash} from "lucide-react";
import {Badge} from "../components/ui/badge.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "../components/ui/dropdown-menu.tsx";
import {Button} from "../components/ui/button.tsx";
import {Book} from "../types.ts";
import {useNavigate} from "react-router-dom";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../components/ui/alert-dialog.tsx";
import {useEffect, useState} from "react";
import {Pagination, PaginationContent, PaginationItem,} from "../components/ui/pagination"

const BooksPage = () => {

    const navigate = useNavigate();

    // Defining some component state variables
    const[bookID,setBookID] = useState("")
    const[responseState,setResponse] = useState("")
    const [page,setPage] = useState(1)

    // Defining the side Operation which will run when the page first render
    // and everytime the variables present in passed array argument changes.
    useEffect(()=>{
        // Set the Response State to "Empty Array"
            setResponse("")
    },[bookID])

    // By Default, React Query cache the data.
    // But After every time the fetch fetches the data from the server
    // Data is considered "Stale(Not Fresh)" which trigger re-fetching every time
    // So, we can use "staleTime" property to specify the time for which the data is considered fresh.
    const query = useQuery({
        queryFn: async () => {
            return getBooks(page)}
         ,queryKey:["books",page]
        ,staleTime: 5000 // Fetched Data is considered Fresh for 5 Seconds then this data will be considered not fresh and
        // force the re-fetch of the data.
    })

    // Accessing the React Query instance for the React application
    // To Manage the other queries used in React Application.
    const queryClient = useQueryClient()

    // if any error fetching the data then error will be returned to the user,
    if (query?.isError) {
        return <div>{query?.error.message}</div>
    }

    // Defining the mutation object/instance for Deleting the book
    const deleteMutation = useMutation({
        mutationFn:deleteBook,
        onSuccess:(response)=>
        {
            if(response.status === 204)
            {
                setResponse("Your book has been deleted successfully !")
            }
            // Force the specified queries for re-fetching of the data from the server.
            queryClient.invalidateQueries({queryKey:["books"]})
        }})

    // Defining the function which will be called when the Delete Confirmation button is clicked.
    const BookDeletion = () =>
    {
        deleteMutation.mutate(bookID)
    }

    // Go to Previous Page
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

    // Goes to next page.
    const nextPage = () =>
    {
        setPage(page + 1)
    }


    return(<>
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink>Books</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Button onClick={()=>{navigate("/dashboard/books/create")}} className={"flex gap-2"}><CirclePlus size={18} /> Add Book </Button>
        </div>

        <AlertDialog>

        <Card className="mt-6">
            <CardHeader>
                <CardTitle className={"flex gap-2"}>Books
                    { query?.isLoading && <LoaderCircle className={"animate-spin font-bold"}/>}
                </CardTitle>
                <CardDescription>
                    Manage your Books and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>

                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Author
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Created at
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {query?.data?.data.map((book: Book) => {
                            return (
                                <TableRow key={book._id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img
                                            alt="Product image"
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={book.coverImage}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {book.title}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={"outline"}>{book.genre}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {book.author.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {book.createdAt}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4"/>
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={()=>{navigate(`/dashboard/books/update/${book._id}`)}}>Edit</DropdownMenuItem>
                                                <AlertDialogTrigger className={"w-full"} onClick={()=> {setBookID(book._id)}}>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </AlertDialogTrigger>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </CardContent>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{responseState === "" ? "Are you absolutely sure ?": "Deleted"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {
                            responseState === ""
                            ? <span>This action cannot be undone. This will permanently delete your Book and remove your Book from our servers.</span>
                            : <span className={"text-green-800 text-md font-bold"}>{responseState}</span>
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter >
                    {
                        responseState === ""
                        ?
                        <>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button onClick={BookDeletion} disabled={deleteMutation.isPending}> Delete { deleteMutation.isPending && <LoaderCircle className={"animate-spin ml-2 font-bold"}/>} </Button>
                        </>
                        :   <AlertDialogCancel>Okay</AlertDialogCancel>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>

            <div className={"mb-4"}>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button onClick={previousPage}>Previous</Button>
                        </PaginationItem>
                        <PaginationItem className={"ml-6 mr-6"}>
                            <span className={"px-4 py-2 rounded-md border-solid border-2 border-indigo-600"}>{page}</span>
                        </PaginationItem>
                        <PaginationItem>
                            <Button  onClick={nextPage}>Next</Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </Card>
        </AlertDialog>

    </>)
}
export default BooksPage