import React from "react";
import ContentBox from "./ContentBox";
import VerticalMenu from "./VerticalMenu";

type SlimRouteProps = {path:string; text:string; element:() => JSX.Element }
export type SubpageLoaderProps = {
    header?: () => JSX.Element;
    footer?: () => JSX.Element;

    pages:SlimRouteProps[]
    routeFilters?:string[];
}

export default class SubpageLoader extends React.Component <SubpageLoaderProps, {currentPage: string}>
{
    state = {currentPage: ""}
    public render = (): React.ReactNode =>
    {
        const {Header, Footer} = {Header: this.props.header, Footer: this.props.footer}   
        let Body = () => <VerticalMenu entries={
            this.props.pages.filter(route => !(this.props.routeFilters ? this.props.routeFilters : []).includes(route.path)).map(route => {
                return {
                    text:route.text[0].toUpperCase() + route.text.slice(1, route.text.length), 
                    onclick: () => this.setState({...this.state, currentPage:route.path})
                }
            }
        )} />

        if(this.state.currentPage.length)
        {
            let route = this.props.pages.find(route => route.path === this.state.currentPage);
            if(!route) 
                route = {text: "", path: "page_not_found", element: () => <ContentBox header="Er ging iets fout tijdens het ophalen van de pagina" content={<>
                    Klik <u style={{cursor: "pointer"}} onClick={() => this.setState({...this.state, currentPage: ""})}>hier</u> om terug naar het hoofdmenu te gaan...
                </>} /> }
            
            Body = route.element;
        }

        return (<>
            {Header ? <Header /> : <></>}

            <div className="my-3">
                <Body />
            </div>

            {Footer ? <Footer /> : <></>}
        </>)
    }
}