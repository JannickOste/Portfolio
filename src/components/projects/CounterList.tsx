import { useState } from "react";

type CounterListState = {
    counters:number[];
}

export const CounterList = () => {
    const [state, setState] = useState<CounterListState>({counters: []});
    const total = state.counters.reduce((prev, current) => prev+current, 0);
    return (<>
        <div className={`border text-center p-2`}>Som van de tellers: <span className={`text-${(total > 0 ? "success" : total < 0 ? "danger" : "dark")}`}>{total}</span></div>

        <div className="d-flex justify-content-between flex-column border p-2">
            {state.counters.map((v, counterIndex) => (
                <div key={counterIndex} className="d-flex justify-content-between w-100 my-1">
                    <input type="button" value="verlaag" className="btn btn-danger" onClick={() => setState({...state, counters: state.counters.map((sv, subIndex) => subIndex === counterIndex ? sv-1 : sv)})} />
                    <span className={`text-${(v > 0 ? "success" : v < 0 ? "danger" : "dark")}`}>{v}</span>
                    <input type="button" value="verhoog" className="btn btn-success" onClick={() => setState({...state, counters: state.counters.map((sv, subIndex) => subIndex === counterIndex ? sv+1 : sv)})} />
                </div>
            ))  
        }
        </div>
        <input type="button" value="Voeg teller toe" className="w-100 btn btn-success" onClick={() => setState({...state, counters: [...state.counters, 0]})} />
    </>)
}