import { Link } from "react-router-dom";
import TextInput from "../elements/TextInput";
const listStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-evenly",
    borderTop: "1px dashed #111"
}


const Header = () => {
    const searchEvent = (text:string) => {

    }
    return (
        <>
            <header className="bg-dark p-2 text-white">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">    
                        {[
                                ["/", "Home"], 
                                ["/projects", "Projects"], 
                                ["/chat", "OpenAI Chat"],
                                ["/contact", "Contact"],
                        ].map(set => <li className="nav-item"><Link to={set[0]} className="nav-link" >{set[1]}</Link></li> )}
                    </ul>
                </div>
                </nav>
            </header>

        </>
    ); //<TextInput buttonText="Search" onSubmit={searchEvent} placeholder="Search query" formStyling={{display: "flex"}} textboxStyling={{flex: 2, textAlign: "right"}} buttonStyling={{flex: 1, backgroundColor: "#222", border: 0, color: "white"}} />
        
}

export default Header;