/*
** -> Maak een nieuw component DadJoke aan.
** -> Maak een functie loadJoke die een "awkward dad joke" ophaalt van de API https://icanhazdadjoke.com/. Gebruik de fetch API om de data op te halen. Plaats het resultaat in een state van het component.
* -> Zorg ervoor dat de functie wordt opgeroepen wanneer het component gemounted wordt. Gebruik de useEffect hook om dit te doen.
* -> Eenmaal de data geladen is, toon je de joke in een <div> element. Zorg voor een kaartje waarin de joke getoond wordt.
* -> Plaats een button New Joke onderaan de joke. Wanneer de gebruiker op deze button klikt, wordt er een nieuwe joke opgehaald.
* -> Plaats een button Set as favorite onderaan de joke. Wanneer de gebruiker op deze button klikt, wordt de huidige joke (als string) opgeslagen in de localStorage van de browser.
* -> Bij het opstarten van de applicatie, wordt de laatst opgeslagen joke getoond. Gebruik hiervoor de useEffect hook.
*/
import { useEffect, useState } from "react"

const loadJoke = async() => {
    return (await (await(fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    }))).json()).joke;
}

type DadJokeState = {
    joke?:string;
    favoriteJoke?: string;
}

const Card = ({content}: {content: JSX.Element}) => {
    return (
        <div className="card m-5 p-2 d-flex flex-column" >
            <div className="card-body">
                {content}
            </div>
        </div>
    )
}

const DadJoke = () => {
    const [state, setState] = useState<DadJokeState>();
    useEffect(() => {
        (async() => {
            if(!state?.joke || !state.joke.length)
                setState({...state, joke: await loadJoke()});

            if(state?.favoriteJoke === undefined)
            {
                const favoriteJoke = localStorage.getItem("favoriteJoke");
                if(favoriteJoke)
                    setState({...state, favoriteJoke: favoriteJoke})
            }
        })();
    }, [state]);

    const buttonStyling: React.CSSProperties = {
        flex: 1,
        border: 0,
        margin: "0 10px"
    }

    return (
        <>
            <Card content={(
                <>
                    <p className="w-100 text-center">{state?.joke}</p>
                    <div className="d-flex">
                        <input type="button" onClick={(ev) => setState({...state, joke: ""})} value="New joke" style={buttonStyling}/>
                        <input type="button" onClick={(ev) => {
                            setState({...state, favoriteJoke: state?.joke});
                            localStorage.setItem("favoriteJoke", state?.joke as string);
                        }} value="Set as favorite" style={buttonStyling}/>
                    </div>
                </>
            )} />

            {state?.favoriteJoke ? <Card content={(<>{state.favoriteJoke}</>)} /> : (<></>)}
        </>
    )
}

const LocalStorage = () => (<div className="border m-1"><DadJoke /></div>)

export default LocalStorage;
