import { useEffect, useState } from "react";
import ChatMessage, { ChatMessageProps } from "../components/elements/chat/ChatMessage";
import OpenAI from "../apis/OpenAI";
import ChatNoKeyForm from "../components/elements/chat/ChatNoKeyForm";
import ChatUI from "../components/elements/chat/ChatUI";

type ChatState = {
    initialized:boolean;
    messages: ChatMessageProps[];

    openaiUserKey?:string;
    openaiUserLimit?:number;
    error?:string;

    openai?:OpenAI;
}

/**
 * Renders a chat interface that uses OpenAI to generate responses.
 *
 * @returns {ReactElement} A React element representing the chat interface.
 */
const Chat = () => {
    const [state, setState] = useState<ChatState>({messages: [], initialized: false});

    useEffect(() => {
        const last = state.messages.at(-1);
        if(last && last.from.toLowerCase() == "human" && state.openai)
            (async() => {
                try
                {
                    if(state.openai)
                    {
                        const response = await state.openai.getResponse(state.messages.map(msg => `${msg.from}:\n${msg.message}`).join("\n"));
                        setState({...state, messages: [...state.messages,
                            {from: "AI", message: response.data.choices[0].text as string}
                        ]});
                    }
                } catch(e) 
                {
                    const errorCodeRaw = (e as Error).message.split(" ").at(-1);
                    let message = "";
                    switch(errorCodeRaw? parseInt(errorCodeRaw) : -1)
                    {
                        case 401:
                            message = "Invalid OpenAI key";
                            break;
                        case -1:
                        default:
                            message =  "An unkown error occured...";
                            break;
                    }
                    
                    setState({...state, error:message});
                }
            })();
    }, [state.messages])

    if(process.env.REACT_APP_OPENAI_KEY)
        setState({...state, openai: OpenAI.Singleton});

    return (
        <div className="bg-white border p-2" style={{borderRadius: 5}} >
            {
            process.env.REACT_APP_OPENAI_KEY === undefined && [state.openaiUserKey, state.openaiUserLimit].every(v => v === undefined)
                ? (<ChatNoKeyForm 
                    onSubmit={(apiKey, creditLimit) => {
                        setState({...state, openaiUserKey: apiKey, openaiUserLimit: creditLimit, openai: new OpenAI(apiKey, creditLimit)})
                        localStorage.setItem("openai_key", apiKey);
                        localStorage.setItem("openai_limit", `${creditLimit}`);
                        alert(apiKey)
                        
                    }} 
                    apiKey={localStorage.getItem("openai_key")}
                    limit={localStorage.getItem("openai_limit")}
                />) 
                : (<>
                    <p className="h1 text-center mb-2">OpenAI chat</p>
                    {state.openaiUserKey && state.openaiUserLimit ? (<div className="border bg-success text-white text-center py-2">
                        Ingelogd met een persoonlijke token - <u style={{cursor:"pointer"}} onClick={() => {
                            localStorage.setItem("openai_key", "");
                            localStorage.setItem("openai_limit", "");

                            setState({...state, openaiUserKey: undefined, openaiUserLimit: undefined})
                        }}>Uitloggen</u>
                    </div>) : (<></>)}
                    
                    {state.error ?  (<div className="border bg-danger text-white text-center py-2">
                        {state.error}
                    </div>) : (<></>)}

                    <ChatUI messages={state.messages} onSend={(text) => setState({...state, error:"", messages: [...state.messages, {from: "Human", message: text}]})}  />
                </>)
            }
        </div>)
}

export default Chat;