import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "../components/ui/breadcrumb.tsx";
import {LoaderCircle, Slash} from "lucide-react";
import {Button} from "../components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {Input} from "../components/ui/input.tsx";
import {Textarea} from "../components/ui/textarea.tsx";
import { useForm} from "react-hook-form";
import zod  from "zod"
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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createBook} from "../http/api.ts";
const CreateBook = () => {

    // Using the "useNavigate" React hook to navigate around the website
    const navigate =  useNavigate()

    // Defining the Validation Schema using the "zod Validation Library"
    // Which will be used by the "Shadcn UI Form Hook" to validate the form fields.
    const formSchema = zod.object({
        title: zod.string().min(1,"Book Title is Required"),
        description: zod.string().min(1,"Book Description is Required"),
        genre: zod.string().min(1,"Book Genre is Required"),
        /**
         * "FileList" is a built-in "JavaScript Class" Whose instance is used to hold "Collection of files" selected by
         * the "input" element.
         * and Each "input element" has its own "FileList" object contained inside the ".files" property of the input element.
         * Note: ".refine" method is used to perform Custom Validation on specified field.
         */
        coverImage: zod.instanceof(FileList).refine((fileList)=> {return fileList.length === 1}, "Cover Image is required"),
        file: zod.instanceof(FileList).refine((fileList)=> {return fileList.length === 1}, "Book PDF is required"),
    })

    // Initializing the Form Hook:
    // As well as specifying the Validation Schema and specifying the fields too.
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        /**
         * Defining which fields needed to be handled by the "Form Hook"
         */
        defaultValues:{title:"",description:"",genre:""}
    })

    /**
     * Registering the Two more fields which need to be handled by the Form Hook
     * Which will apply or validate it against the specified Validation Schema.
     */
    const imageRef = form.register("coverImage");
    const fileRef = form.register("file")

    // Accessing the QueryClient instance we created for this React app
    const queryClient = useQueryClient()

    // Using the useMutation hook to send the data to the server.
    const mutation = useMutation({
        mutationFn:createBook,
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey:["books"]}) //????
            console.log(response.data)
            navigate("/dashboard/books")
        }
    })



    /**
     * Defining the method which will be executed when the form is submitted.
     * @param values (passed as argument by the "form.handleSubmit()")
     */
    function onSubmit(values: zod.infer<typeof formSchema>)
    {
        /**
         * Creating the instance of "FormData"
         * To represent the fields and their values of a form.
         */
        const formData = new FormData();

        // Appending key/value pairs to the form.
        formData.append("title", values.title)
        formData.append("genre", values.genre)
        formData.append("description", values.description)
        formData.append("coverImage", values.coverImage[0])
        formData.append("file", values.file[0])

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }


        mutation.mutate(formData)







    }

    // @ts-ignore
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
                            <Button className={"flex gap-2"} type={"submit"} disabled={mutation.isPending}> Submit {(mutation.isPending &&
                                <span className={"animate-spin"}> <LoaderCircle/> </span>)}</Button>
                        </div>
                    </div>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className={"flex gap-2"}>Create a New Book</CardTitle>
                            <CardDescription>
                                Fill out the below form to create a new book.
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
                                           render={({field}) => (
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
                                                   <FormLabel>Cover Image</FormLabel>
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
                                                   <FormLabel>File</FormLabel>
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
                    </CardContent>
                </Card>
            </form>
        </Form>
</section>
)}

export default CreateBook;