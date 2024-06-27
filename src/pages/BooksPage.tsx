import {getBooks} from "../http/api.ts";
import {useQuery} from "@tanstack/react-query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "../components/ui/breadcrumb.tsx";
import {CirclePlus, LoaderCircle, MoreHorizontal, Slash} from "lucide-react";
import {Badge} from "../components/ui/badge.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../components/ui/dropdown-menu.tsx";
import { Button } from "../components/ui/button.tsx";
import {Book} from "../types.ts";
import {useNavigate} from "react-router-dom";

const BooksPage = () => {

    const navigate = useNavigate();

    // By Default, React Query does not cache the data.
    const query = useQuery({queryFn:getBooks,queryKey:["books"]
    ,staleTime: 10000 // ? Stale
    })

    if (query.isError) {
        return <div>{query.error.message}</div>
    }
    // @ts-ignore
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

        <Card className="mt-6">
            <CardHeader>
                <CardTitle className={"flex gap-2"}>Books
                    { query.isLoading && <LoaderCircle className={"animate-spin font-bold"}/>}
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
                        {query.data?.data.map((book: Book) => {
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
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                </TableRow>)
                        })}


                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                </div>
            </CardFooter>
        </Card>
    </>)
}
export default BooksPage