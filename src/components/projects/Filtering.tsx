/*
* Maak een component Filtering aan met de volgende functionaliteit:
 * -> Maak een lijst van studenten met de volgende properties: name, age, year.
 * -> Zorg voor een search input waar de gebruiker kan zoeken op naam.
 * -> Als de gebruiker in de search input typt, moet de lijst gefilterd worden op de naam van de student.
 * -> Als je op de header van de tabel klikt, moet de lijst gesorteerd worden op de property waarop je geklikt hebt.
 * -> Je hebt hier twee states nodig: sortField en searchText. De eerste state bevat de property waarop gesorteerd moet worden, de tweede state bevat de tekst die gebruikt wordt om te filteren.
*/

import { useState } from "react";

interface Student {
    name:string;
    age:string;
    year:string;
}

type FilteringState = {
    sortField:string; 
    searchText?:string;
}

const students: Student[] = [
    {name: "Jacob",   age: "21", year: "2"},
    {name: "Jan",     age: "20", year: "1"},
    {name: "Joris",   age: "22", year: "3"},
    {name: "Joris",   age: "22", year: "3"},
    {name: "Korneel", age: "23", year: "4"},
    {name: "Mathias", age: "22", year: "3"},
    {name: "Muhammad",age: "20", year: "1"},
    {name: "Perneel", age: "22", year: "3"},
    {name: "Piet",    age: "21", year: "2"}
]

const Filtering = () => {
    const [state, setState] = useState<FilteringState>({
        sortField: "name"
    });

    console.dir()
    return (
        <>
            <input type="text" name="search" className="w-100" placeholder="Search query for selected field..." onChange={(ev) => setState({...state, searchText: ev.target.value})}/>
            <table className="w-100 table table-striped mt-5">
                <thead>
                    <tr>
                        {["name", "age", "year"].map((v, i) => 
                            <th key={i} onClick={(ev) => setState({...state, sortField: ev.currentTarget.textContent as string})}>
                                {v == state.sortField.toLocaleLowerCase() ? (<u >{v}</u>) : <>{v}</>}
                            </th>
                        )}
                        
                    </tr>
                </thead>

                <tbody>
                    {students.filter(v => !state.searchText ? true : Object.getOwnPropertyDescriptor(v, state.sortField)?.value.includes(state.searchText)).map((v, i) => <tr key={i}>
                        <td>{v.name}</td>
                        <td>{v.age}</td>
                        <td>{v.year}</td>
                    </tr>)}
                    <tr>

                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Filtering;