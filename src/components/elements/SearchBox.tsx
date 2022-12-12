import React, { useState } from "react";

type TextInputProps = {
    placeholder?:string;
    buttonText:string;

    disabled?:boolean;

    formStyling?:React.CSSProperties;
    formClassName?:string;

    textboxStyling?:React.CSSProperties;
    textboxClassName?:string;

    buttonStyling?:React.CSSProperties;
    buttonClassName?:string;

    onSubmit: (text:string) => void;
}

/**
 * SearchBox component - A component that displays a text input field with a submit button.
 *
 * @param placeholder - The placeholder text for the input field.
 * @param onSubmit - The function to be called when the submit button is clicked. This function will be passed the current input text as its only argument.
 * @param buttonText - The text to be displayed on the submit button.
 * @param textboxStyling - Styles to be applied to the text input field.
 * @param buttonStyling - Styles to be applied to the submit button.
 * @param formStyling - Styles to be applied to the form element.
 */
const SearchBox = ({placeholder, onSubmit, buttonText, textboxStyling, buttonStyling, formStyling, textboxClassName, buttonClassName, formClassName, disabled}: TextInputProps) => 
{
    const [state, setState] = useState<{text:string}>({text: ""});

    return (
        <form method="POST" style={formStyling} className={formClassName} onSubmit={(ev) => {
            ev.preventDefault();
            onSubmit(state?.text)}
        }>      
            <input type="text"   disabled={disabled} placeholder={placeholder} className={textboxClassName} style={textboxStyling} onChange={(ev) => setState({...state, text: ev.target.value})} />
            <input type="submit" disabled={disabled} value={buttonText} className={buttonClassName} style={buttonStyling} />
        </form>
    )
}

export default SearchBox;