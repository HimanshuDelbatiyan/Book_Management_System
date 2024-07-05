"use client" // Making the Component as Client-Side Component.

import {Button} from "./ui/button.tsx";

const DownloadButton = ({fileLink}:{fileLink:string}) =>
{

    const handleDownload = () =>
    {
        // This will open a new "Tab" in the browser with the link Specified.
        return window.open(fileLink,"_blank");
    }

    return(<>
        <Button
            onClick={handleDownload}
            className={"mt-4 w-70"}>
            Download the book
        </Button>
    </>)
}

export default DownloadButton;