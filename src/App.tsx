import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Master from "./components/layout/Master";
import PageNotFound from "./pages/PageNotFound";
import { ProjectInfoProps } from "./components/elements/groups/projects/ProjectInfo";
import { RouteObjectExtended } from "./RoutedObjectExtended";
import { useState } from "react";
import React from "react";

type ApplicationState = {

}

type ApplicationProps = {
    routes:RouteObjectExtended[];
    projects:ProjectInfoProps[];
}

/**
 * Application is a React component that acts as the root component for the
 * application.
 *
 * The `render` method returns the JSX for the component, which includes the
 * `Master` component and all the application routes. If a route does not
 * exist, the `PageNotFound` component is displayed.
 *
 * The `onApplicationSearch` method is called when the user submits a search
 * query in the search box. The method searches for a match in the application
 * routes and projects and navigates to the matching route or project if
 * found. If no match is found, an error message is displayed.
 */
export default class Application extends React.Component<ApplicationProps, ApplicationState>
{
    state = {};

    /**
     * onApplicationSearch is an event handler that is called when the user
     * submits a search query in the search box.
     *
     * This method searches for a match in the application routes and projects
     * and navigates to the matching route or project if found. If no match is
     * found, an error message is displayed.
     *
     * @param searchQuery The search query entered by the user.
     */
    private onApplicationSearch = (searchQuery: string) => {
        searchQuery = searchQuery.toLocaleLowerCase();

        const searchProjectMatch = () => {
            for(let project of this.props.projects)
                if(project.name.toLocaleLowerCase().includes(searchQuery))
                    return "/projects#"+project.name.replace(" ", "").toLocaleLowerCase()
                    
            return "";
        }
        
        const searchRouteMatch = (route:RouteObjectExtended) => 
        {
            if(route.text.toLocaleLowerCase().includes(searchQuery) || route.path?.includes(searchQuery))
                return route.path as string;
            else if(route.children)
                for(let child of route.children)
                    if(searchRouteMatch(child)?.length)
                        return child.path as string;
            
            return "";
        }
        

        let uri = "";
        if((uri = searchProjectMatch()) || (uri = this.props.routes.map(route => searchRouteMatch(route)).filter(s => s.length)[0]))
            return window.location.replace(uri);

        alert("Geen zoekresultaten gevonden. (todo: dit veranderen naar betere popup)")
    }

    
    /**
     * render is a method that returns the JSX for the `Application` component.
     *
     * The JSX includes the `Master` component and all the application routes.
     * If a route does not exist, the `PageNotFound` component is displayed.
     *
     * @returns The JSX for the `Application` component.
     */
    public render = (): React.ReactNode => (<RouterProvider router={createBrowserRouter([{
        path: "/", 
        element: <Master routes={this.props.routes} onSearch={this.onApplicationSearch} />,
        children: this.props.routes,
        errorElement: <PageNotFound />
    }])} />)
}

