import React, { useState } from "react";

type TextInputProps = {
    placeholder?:string;
    buttonText:string;

    formStyling?:React.CSSProperties;
    textboxStyling?:React.CSSProperties;
    buttonStyling?:React.CSSProperties;

    onSubmit: (text:string) => void;
}

/**
 * TextInput component - A component that displays a text input field with a submit button.
 *
 * @param placeholder - The placeholder text for the input field.
 * @param onSubmit - The function to be called when the submit button is clicked. This function will be passed the current input text as its only argument.
 * @param buttonText - The text to be displayed on the submit button.
 * @param textboxStyling - Styles to be applied to the text input field.
 * @param buttonStyling - Styles to be applied to the submit button.
 * @param formStyling - Styles to be applied to the form element.
 */
const TextInput = ({placeholder, onSubmit, buttonText, textboxStyling, buttonStyling, formStyling}: TextInputProps) => 
{
    const [state, setState] = useState<{text:string}>({text: ""});

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