import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "../components/ui/breadcrumb.tsx";
import {LoaderCircle, Slash} from "lucide-react";
import {Button} from "../components/ui/button.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Input} from "../components/ui/input.tsx";
import {Textarea} from "../components/ui/textarea.tsx";
import {useForm} from "react-hook-form";
import zod from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../components/ui/form.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createBook, singleBook, updateBook} from "../http/api.ts";
import {useEffect} from "react";
const CreateBook = () =>
{

    let querySingleBook:any;
    // Using the React Query instance created for the application
    const queryClient = useQueryClient();
    // Using the useNavigate hook to navigate throughout the website
    const navigate = useNavigate();
    // Defining an variable which will hold the useQuery instance for getting the single book

    const baseSchema = {
        title: zod.string().min(1, "Book Title is Required"),
        description: zod.string().min(1, "Book Description is Required"),
        genre: zod.string().min(1, "Book Genre is Required"),
    };

    const {id} = useParams();

    const form = useForm({
        resolver: zodResolver(zod.object( id ? {
            // using the spread Operator to include the another object inside the another
            ...baseSchema,
            coverImage: zod.any(),
            file: zod.any(),
        } : {
            ...baseSchema,
            coverImage: zod.instanceof(FileList).refine((fileList) => fileList.length === 1, "Cover Image is required"),
            file: zod.instanceof(FileList).refine((fileList) => fileList.length === 1, "Book PDF is required"),
        })),
        defaultValues: {title: "", description: "", genre: "",coverImage:null,file:null}
    })

    // If "id" is not empty then fetch the associated document from the collection.
    if(id)
    {
        // useQuery hook will refetch the data everytime "id" changes cause
        // id has been passed as an argument to the queryKey.
        // Note: EveryTime Query Key Changes React Query Re-run the function
        querySingleBook = useQuery(
            {
                queryFn: async () => {
                    const data = await singleBook(id as string)
                    return data;
                }, queryKey: ["getSingle",id]
            })

        // If there is any error then log that into the console.
        if (querySingleBook.isError)
        {
            console.log(querySingleBook.error.message)
        }
    }

    // Once we got the data
    useEffect(() =>
    {
        if (querySingleBook?.data)
        {
            form.setValue("title", querySingleBook.data.data.title);
            form.setValue("description", querySingleBook.data.data.description);
            form.setValue("genre", querySingleBook.data.data.genre);

        }
    },[id,querySingleBook?.data]);

    const imageRef = form.register("coverImage")
    const fileRef = form.register("file")


    // This function will return the function
    // based on whether the Id is empty or not.
    const functionFinder = (id:string) =>
    {
        if(id)
        {
            return updateBook;
        }
        else {
            return createBook
        }
    }


    // Defining the mutation Object which will be used to send the new or existing book new data to the server.
    const mutation = useMutation(
            {
                mutationFn: functionFinder(id as string),
                onSuccess: (response) => {
                    queryClient.invalidateQueries({queryKey: ["books"]})
                    console.log(response.data)

                    navigate("/dashboard/books")
                }
            })


    function onSubmit(values: any)
    {
        // Defining an FormData Instance which will hold the data for the form
        // As well as FormData makes sending the data to the server easier
        // when using the fetch or Axios.
        const formData = new FormData();

        formData.append("title", values.title)
        formData.append("genre", values.genre)
        formData.append("description", values.description)

        if(values.coverImage) {
            formData.append("coverImage", values.coverImage[0])
        }
        if(values.file)
        {
            formData.append("file", values.file[0])
        }

        // Log all the entries into the Console
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        if(!id)
        {
            mutation.mutate(formData)

        }
        else {
            // @ts-ignore
            mutation.mutate({formData,id})
        }

    }

    return(
        <section>
            <Form {...form}>
                <form
                      onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"flex items-center justify-between"}>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/books/create">Create Book</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className={"flex items-center gap-4"}>
                            <Link to={"/dashboard/books"}><Button variant={"outline"} className={"flex gap-2"}> Cancel </Button></Link>
                            <Button className={"flex gap-2"} type={"submit"} disabled={mutation.isPending}> {id ? "Update" : "Submit"} {(mutation.isPending &&
                                <span className={"animate-spin ml-2"}> <LoaderCircle/> </span>)}</Button>
                        </div>
                    </div>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className={"flex gap-2"}>{id ? "Update an Existing": "Create a new"} Book
                                </CardTitle>
                            <CardDescription>
                                    Fill out the below form {id ? "to Update the book" : "to create a new book" }.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {/*Specifying that this field will be controlled by the "Form Hook's" . control method
                                Which will take care of validation and other stuff for this field.
                                */}
                                <FormField control={form.control} name={"title"}
                                           render={({field}) =>
                                           (
                                               <FormItem>
                                                   <FormLabel>Title</FormLabel>
                                                   <FormControl>
                                                       <Input
                                                           id="title"
                                                           type="text"
                                                           className="w-full"
                                                           {...field}
                                                       />
                                                   </FormControl>
                                                   <FormMessage/>
                                               </FormItem>
                                           )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField control={form.control} name={"description"}
                                           render={({field})=> (
                                               <FormItem>
                                                   <FormLabel>Description</FormLabel>
                                                   <FormControl>
                                                       <Textarea
                                                           id="description"
                                                           className="min-h-32"
                                                           {...field}
                                                       />
                                                   </FormControl>
                                                   <FormMessage/>
                                               </FormItem>
                                           )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField control={form.control} name={"genre"}
                                           render={({field}) => (
                                               <FormItem>
                                                   <FormLabel>Genre</FormLabel>
                                                   <FormControl>
                                                       <Input
                                                           id="genre"
                                                           type="text"
                                                           className="w-full"
                                                           {...field}
                                                       />
                                                   </FormControl>
                                                   <FormDescription/>
                                                   <FormMessage/>
                                               </FormItem>
                                           )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField control={form.control} name={"coverImage"}
                                           render={() => (
                                               <FormItem>
                                                   <FormLabel>Cover Image{id && " (Optional)"}</FormLabel>
                                                   <FormControl>
                                                       <Input
                                                           id="coverImage"
                                                           type="file"
                                                           className="w-full"
                                                           {...imageRef}
                                                       />
                                                   </FormControl>
                                                   <FormMessage/>
                                               </FormItem>
                                           )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField control={form.control} name={"file"}
                                           render={() => (
                                               <FormItem>
                                                   <FormLabel>File:{id && " (Optional)"}</FormLabel>
                                                   <FormControl>
                                                       <Input
                                                           id="file"
                                                           type="file"
                                                           className="w-full"
                                                           {...fileRef}
                                                       />
                                                   </FormControl>
                                                   <FormMessage/>
                                       </FormItem>
                               )}
                                />
                            </div>
                            {id && <div className={"mt-2 p-2 text-red-800 font-bold"}>Note: If no files are uploaded then old ones will be utilized.</div>}
                    </CardContent>
                </Card>
            </form>
        </Form>
    </section>)
}


export default CreateBook;