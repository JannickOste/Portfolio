import { useEffect, useState } from "react"

type PokedexState = {
    start:number;
    limit:number;
    pokemon:string[];
    name:string;
}

const Pokedex = () => {
    const [state, setState] = useState<PokedexState>({
        start: 1,
        limit: 10,
        pokemon: [],
        name: ""
    });


    useEffect(() => {
        (async() => {
            const response = fetch(`https://pokeapi.co/api/v2/pokemon?limit=${state.limit}&offset=${state.start-1}`);
            setState({...state, pokemon: (await (await response).json()).results.map((i: any) => i.name)});

        })()
    }, [state.start, state.limit]);

    return (
        <div className="d-flex flex-column">
            <input type="text" name="pokename" placeholder="Pokemon name includes" onChange={(ev) => setState({...state, name: ev.target.value})}/>
            <hr />
            <div className="d-sm-flex">
                <label htmlFor="start" style={{flex:2}}>Starting number:</label>
                <input type="number" className="w-100" style={{flex: 4}} value={state.start} onChange={(ev) => setState({...state, start: parseInt(ev.target.value)})} />
            </div>
            <div className="d-sm-flex">
                <label htmlFor="amount" style={{flex:2}}>Amount of pokemon:</label>
                <input type="number" value={state.limit} className="w-100" style={{flex: 4}} onChange={(ev) => setState({...state, limit: parseInt(ev.target.value)})} />
            </div>
            <hr />
            {state.pokemon.filter(s => !state.name.length || s.includes(state.name)).map((s, i) => <div key={i} className="border w-100 text-center p-1 mt-1">#{i+state.start}: {s}</div>)}
        </div>
    )
}
const Pokemon = () => {
    return (
        <div className="box-dashed m-1">
            <Pokedex />
        </div>
    )
}

export default Pokemon;