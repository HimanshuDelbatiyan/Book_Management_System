import {Link} from "react-router-dom";

const BookCard = ({book}:{book:any}) =>
{
    return(<>
        <div className="flex gap-5 border rounded p-5 shadow-md ">
            {/*Using the next Image Component*/}
            <img src={book.coverImage} alt={"LL"} width="0" height="0" sizes="100vw" style={{width:"auto", height:"12rem"}}/>
            <div>
                <h2 className="line-clamp-2 text-xl font-bold text-primary-600 ">{book.title}</h2>
                <p className="font-bold text-primary-900 mt-1">{book.author.name}</p>
                <Link className=" py-1 px-2 rounded-md border border-primary-100 mt-2 inline-block hover:bg-primary-100 hover:border-primary-100 font-medium transition" to={`book/${book._id}`}>Read More</Link>
            </div>
        </div>

    </>)
}
export  default BookCard