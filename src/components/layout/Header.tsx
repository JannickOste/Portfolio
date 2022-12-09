import { useState } from "react";
import { Link } from "react-router-dom";
export type HeaderNavLink = {
    text:string;
    to:string;
}
export type HeaderProps = {
    navigation: HeaderNavLink[];
    onSearch:(text:string)=>void;
}

export type HeaderState = {
    searchText?:string;
}

/**
 * Header component for the portfolio
 * 
 *  @param {Object} navigation - An array of objects with a text and a to property that will be used as the navigation links.
 * @param {Function} onSearch - A function that is called when a search is initiated
*/
const Header = ({navigation, onSearch}:HeaderProps) => {
    const [state, setState] = useState<HeaderState>();
    return (
        <>
            <header className="bg-dark p-2 text-white">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                
                <Link className="navbar-brand" to="/">Oste Jannick</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">    
                    {navigation.map((v, i) => <li key={i} className="nav-item"><Link to={v.to?.length ? v.to : "/"} className="nav-link" >{v.text}</Link></li> )}
                    </ul> 
                    
                <form className="form-inline d-flex" style={{marginLeft: "auto"}} onSubmit={(ev) => {
                    ev.preventDefault();
                    if(state?.searchText)
                        onSearch(state?.searchText)
                }}>
                    <input className="form-control mr-sm-2 mx-2" type="search" placeholder="Search" aria-label="Search" value={state?.searchText} onChange={(ev) => setState({...state, searchText:ev.target.value})} />
                    <input className="btn btn-outline-success my-2 my-sm-0 mx-2" type="submit" value="search" />
                </form>
                </div>
                
                </nav>
                
            </header>

        </>
    ); //<TextInput buttonText="Search" onSubmit={searchEvent} placeholder="Search query" formStyling={{display: "flex"}} textboxStyling={{flex: 2, textAlign: "right"}} buttonStyling={{flex: 1, backgroundColor: "#222", border: 0, color: "white"}} />
        
}

export default Header;