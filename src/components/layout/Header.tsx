import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RouteObjectExtended } from "../../RoutedObjectExtended";
export type HeaderProps = {
    navigation?: RouteObjectExtended[];
    onSearch?:(text:string)=>void;
}

export type HeaderState = { searchText?:string; }

export default class Header extends React.Component<HeaderProps, HeaderState>
{
    state:HeaderState={}
    constructor(props: HeaderProps)
    {
        super(props);
    }

    render = (): React.ReactNode => (
        <>
            <header className="bg-dark p-2 text-white">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                
                <Link className="navbar-brand px-3" to="/">Oste Jannick</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {this.props.navigation 
                ? <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">    
                    {this.props.navigation.map((v, i) => {
                        if(v.children && v.children.length)
                            return (<li className="nav-item dropdown" key={i}>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {v.text}
                                    </a>

                                    
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {v.children.map((sv, si) => (<Link key={si} className="dropdown-item" to={sv.path as string}>{(sv as RouteObjectExtended).text}</Link>))}
                                        
                                    </div>
                            </li>)
                        else return(
                            <li key={i} className="nav-item"><Link to={v.path?.length ? v.path : "/"} className="nav-link" >{v.text}</Link></li> 
                        )
                    })}
                    </ul> 
                    
                    <form className="form-inline d-flex" style={{marginLeft: "auto"}} onSubmit={(ev) => {
                        ev.preventDefault();
                        if(this.state?.searchText && this.props.onSearch)
                            this.props.onSearch(this.state.searchText)

                        
                    }}>

                    <input className="form-control mr-sm-2 mx-2" type="search" placeholder="Search project..." aria-label="Search" value={this.state?.searchText} onChange={(ev) => this.setState({...this.state, searchText:ev.target.value})} />
                    <input className="btn btn-outline-success my-2 my-sm-0 mx-2" type="submit" value="search" />
                </form>
                </div>
                : <></>}
                </nav>
                
            </header>

        </>
    )
}