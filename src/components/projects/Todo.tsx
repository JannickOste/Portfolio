import { useState } from "react";

/*
* We beginnen van een voorgemaakte Todo app. Deze app bevat een lijst van taken die je kan toevoegen en verwijderen.
* De app bevat ook een input veld waar je een nieuwe taak kan toevoegen.
 * ->Maak drie nieuwe componenten aan in een aparte map components:
 * --> TodoList bevat de lijst van taken
 * --> TodoItem bevat een enkele taak
 * --> TodoInput bevat het input veld en de knop om een taak toe te voegen
 * -> Verplaats de logica van de App component naar de nieuwe componenten
 * -> De state die de Todo's bevat moet in de App component blijven.
 * -> Je zal dus moeten gebruik maken van props om de state door te geven aan de nieuwe componenten. Je zal ook gebruik moeten maken van child-to-parent communicatie om de state te kunnen updaten.
 * -> Zorg dat elk component in een aparte file staat.
*/
type TodoItemProps = {
    name:string;
    completed:boolean;
    onToggle:(checked: boolean, index: number) => void,
    index:number;
}

const TodoItem = ({name, completed, index, onToggle}:TodoItemProps)=>  (
    <div className="border my-2 p-2 d-flex justify-content-between">
        <label htmlFor="todo" style={{textDecoration: completed ? "line-through" : "none"}}>{name}</label>
        <input type="checkbox" name="todo" id="todo" checked={completed} onChange={(event) => onToggle(event.target.checked, index)}/>
    </div>
)

type TodoInputProps = {
    text:string;
    onChange:(newValue:string) => void;
    onSubmit:() => void;
}

const TodoInput = ({text, onChange, onSubmit}:TodoInputProps) => (
    <div className="d-flex w-100">
        <input id="todo" type="text" placeholder="Todo item name" style={{flex: 3}} value={text} onChange={(event) => onChange(event.target.value)}/>
        <button style={{flex: 1}} onClick={onSubmit}>Add</button>
    </div>
)


const TodoList = ({entries}: {entries: TodoItemProps[]}) => (<>{entries.map((v, i) => <TodoItem completed={v.completed} name={v.name} onToggle={v.onToggle} index={i} key={i} />)}</>);

type TodoAppState = {
    currentInputText:string;
    items: TodoItemProps[];
}

const TodoApp = () => 
{
    const [state, setState] = useState<TodoAppState>({items: [], currentInputText: ""});
    return (<div className="box-dashed m-1">
        <TodoInput onChange={(str) => setState({... state, currentInputText: str})} onSubmit={() => {
            const currentSet = state.items;
            currentSet.push({
                completed: false,
                name: state.currentInputText,
                onToggle: (checked, index) => {
                    const currentToggleSet = state.items;
                    currentToggleSet[index].completed = checked;
                    setState({...state, items: currentToggleSet});
                },
                index: currentSet.length
            });

            setState({...state, items: currentSet, currentInputText: ""})
        }} text={state.currentInputText as string} />
        <TodoList entries={state.items} />
    </div>)
}

export default TodoApp;

/**
 * ORIGINAL SOURCE:
 * ----------------------------------
 * import React, {useState} from "react";

interface TodoItem { 
    name: string;
    completed: boolean;
}

const App = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [todo, setTodo] = useState("");

    const addTodo = (todo: string) => {
        setTodos([...todos, { name: todo, completed: false }]);
        setTodo("");
    };

    const markCompleted = (index: number, completed: boolean) => {
        setTodos(todos.map((todo, i) => i === index ? {...todo, completed: completed} : todo));
    };

    return (
        <div>
            <div>
                <input id="todo" type="text" value={todo} onChange={(event) => setTodo(event.target.value)}/>
                <button onClick={() => addTodo(todo)}>Add</button>
            </div>
            <div>
                {todos.map((todo, index) => (
                    <div key={index}>
                        <input type="checkbox" checked={todo.completed} onChange={(event) => markCompleted(index, event.target.checked)}/>
                        <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default App;
 */