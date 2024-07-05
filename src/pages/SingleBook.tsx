import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {singleBook} from "../http/api.ts";
import {LoaderCircle} from "lucide-react";
import DownloadButton from "../components/DownloadButton.tsx";

const SingleBook = () =>
{
    const {id} = useParams();

    let query:any;

    if(id)
    {
        query = useQuery({queryFn:async () => { const data = await singleBook(id)
            return data},queryKey:["downloadSingle"]})
    }

    console.log(query.data)

    if(query.isError)
    {
        return(<div>{query.error.message}</div>)
    }

    return (
        <>
        {query.isLoading && <div className={"flex items-center justify-center font-bold"}>...Loading <LoaderCircle className={"animate-spin font-bold ml-2"}/></div>}
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
            <div className="col-span-2 pr-16 text-primary-950">
                <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{query.data?.data.title}</h2>
                {/*<span className="font-semibold">by {book.author.name}</span>*/}
                <p className="mt-5 text-lg leading-8">{query.data?.data.description}</p>
                {/*Including the "Client-Side Component" inside the Server-Side Component*/}
                <DownloadButton fileLink={query.data?.data.file} />
            </div>
            <div className="flex justify-end">
                <img
                    src={query.data?.data.coverImage}
                    alt={query.data?.data.title}
                    className="rounded-md border"
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{width: 'auto', height: 'auto'}}
                />
            </div>
        </div>
    </>
    )
}

export default SingleBook;