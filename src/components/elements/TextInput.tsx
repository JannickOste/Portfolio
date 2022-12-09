import React, { useState } from "react";

type TextInputProps = {
    placeholder?:string;
    buttonText:string;
    onSubmit: (text:string) => void;
    formStyling?:React.CSSProperties;
    textboxStyling?:React.CSSProperties;
    buttonStyling?:React.CSSProperties;
}

type TextInputState = {
    text:string;
}

const TextInput = ({placeholder, onSubmit, buttonText, textboxStyling, buttonStyling, formStyling}: TextInputProps) => 
{
    const [state, setState] = useState<TextInputState>({text: ""});

    return (
        <form method="POST" style={formStyling} onSubmit={(ev) => {
            ev.preventDefault();
            onSubmit(state?.text)}
        }>      
            <input type="text" placeholder={placeholder} style={textboxStyling} onChange={(ev) => setState({...state, text: ev.target.value})} />
            <input type="submit" value={buttonText} style={buttonStyling} />
        </form>
    )
}

export default TextInput;