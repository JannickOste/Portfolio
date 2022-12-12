import React from "react";
import ContentBox from "./ContentBox";
import VerticalMenu from "./VerticalMenu";

export type SlimRouteProps = {path:string; text:string; element:() => JSX.Element }

export type SubPageLayoutComponentProps = {
    text:string;
    path:string;
    triggerMainMenu:()=>void
}

export type SubpageLoaderProps = {
    header?: (props: SubPageLayoutComponentProps) => JSX.Element;
    footer?: (props: SubPageLayoutComponentProps) => JSX.Element;

    pages:SlimRouteProps[]
    routeFilters?:string[];
}


export const MAIN_MENU_LABEL = "";
export default class SubpageLoader extends React.Component <SubpageLoaderProps, {currentPage: string}>
{
    state = {currentPage: MAIN_MENU_LABEL}
    


    public render = (): React.ReactNode =>
    {
        const {Header, Footer} = {Header: this.props.header, Footer: this.props.footer}   
        let Body = () => <VerticalMenu entries={
            this.props.pages.sort((a,b) => a.text.localeCompare(b.text)).filter(route => !(this.props.routeFilters ? this.props.routeFilters : []).includes(route.path)).map(route => {
                return {
                    text:route.text[0].toUpperCase() + route.text.slice(1, route.text.length), 
                    onclick: () => this.setState({...this.state, currentPage:route.path})
                }
            }
        )} />

        let route = null;
        if(this.state.currentPage.length)
        {
            route = this.props.pages.find(route => route.path === this.state.currentPage);
            if(!route) 
                route = {text: "", path: "page_not_found", element: () => <ContentBox header="Er ging iets fout tijdens het ophalen van de pagina" content={<>
                    Klik <u style={{cursor: "pointer"}} onClick={() => this.setState({...this.state, currentPage: MAIN_MENU_LABEL})}>hier</u> om terug naar het hoofdmenu te gaan...
                </>} /> }
            
            Body = route.element;
        }
        
        return (<>
            {Header ? <Header text={(route?.text ? route.text : "")} path={(route?.path ? route.path : "")} triggerMainMenu={() => this.setState({...this.state, currentPage: MAIN_MENU_LABEL})}  /> : <></>}

            <div className="my-3">
                <Body />
            </div>

            {Footer ? <Footer text={(route?.text ? route.text : "")} path={(route?.path ? route.path : "")} triggerMainMenu={() => this.setState({...this.state, currentPage: MAIN_MENU_LABEL})}  /> : <></>}
        </>)
    }
}