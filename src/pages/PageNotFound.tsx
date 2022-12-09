import { Link } from "react-router-dom";

const PageNotFound = () => 
{
    return (
        <>
            <h1>404: Page not found</h1>
            <Link to="/">Go back to homepage</Link>
        </>
    )
}

export default PageNotFound;