import { useEffect, useState } from "react";


type ChatNoKeyFormState = {
    apiKey:string;
    creditLimit:number;
}

type ChatNoKeyFormProps = {
    onSubmit:(apiKey:string, maxCredits:number) => void
    apiKey:string|null;
    limit:string|null;
}

/**
 * ChatNoKeyForm component - A form that is displayed when no OpenAI API key is provided in the environment.
 *
 * @param onSubmit - A callback function that is called when the form is submitted. It should accept two arguments: the API key and the credit limit.
 * @param apiKey - The default value for the API key input field. If provided, the input field will be pre-populated with this value.
 * @param limit - The default value for the credit limit input field. If provided, the input field will be pre-populated with this value.
 */
const ChatNoKeyForm = ({onSubmit, apiKey, limit}:ChatNoKeyFormProps) => {
    const [state, setState] = useState<ChatNoKeyFormState>({apiKey: apiKey ? apiKey : "", creditLimit: limit ? parseInt(limit) : 150})

    useEffect(() => {
        if(apiKey && limit)
            onSubmit(state.apiKey, state.creditLimit)
    }, [state]);

    return (
        <>
            <div className="bg-danger p-2 text-white text-center mb-2">
                No OpenAI key found, disabled for live preview, optionaly provide your own key below with a max credit limit 
            </div>

            <form className="d-flex flex-column mt-5" onSubmit={(ev) => {
                ev.preventDefault();
                onSubmit(state.apiKey, state.creditLimit)
            }}>
                <div className="d-sm-flex">
                    <label htmlFor="key" style={{flex: 1}}>API Key:</label>
                    <input type="password" className="w-100" name="key" id="key" value={state.apiKey} placeholder="OpenAI API Key..." onChange={(ev) => setState({...state, apiKey: ev.target.value})} style={{flex: 3}} />
                </div>
                <div className="d-flex"> 
                    <label htmlFor="credits" style={{flex: 1}}>Max credit limit: </label>
                    <input type="number" name="credits" className="w-100" id="credits" value={state.creditLimit} onChange={(ev) => setState({...state, creditLimit: parseInt(ev.target.value)})} style={{flex: 3}} />
                </div>
                <input type="submit" value="login" className="mt-5 btn btn-danger" disabled={!state.apiKey.length} />
            </form>
        </>
    )
}

export default ChatNoKeyForm;