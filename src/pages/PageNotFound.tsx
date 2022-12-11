import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * PageNotFound is a React component that is displayed when the user navigates
 * to a page that does not exist.
 *
 * The `render` method returns the JSX for the component, which includes a
 * "404: Page not found" message and a link to the homepage.
 */
export default class PageNotFound extends React.Component
{
    public render = (): ReactNode => (<>
        <h1>404: Page not found</h1>
        <Link to="/">Go back to homepage</Link>
    </>)
}
