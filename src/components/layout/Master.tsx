import React from "react";
import { Outlet } from "react-router-dom";
import { RouteObjectExtended } from "../../RoutedObjectExtended";
import Footer from "./Footer";
import Header from "./Header";

type MasterPageProps = {
    routes:RouteObjectExtended[];
    onSearch:(text:string) => void;
}

export default class Master extends React.Component<MasterPageProps>
{
    constructor(props: MasterPageProps)
    {
        super(props);
    }

    public render = (): React.ReactNode => (
        <>
            <Header navigation={this.props.routes} onSearch={this.props.onSearch}/>

            <main className="m-md-3 m-sm-1">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}
