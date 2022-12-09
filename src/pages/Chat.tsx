import { useEffect, useState } from "react";
import ChatMessage, { ChatMessageProps } from "../components/elements/ChatMessage";
import OpenAI from "../apis/OpenAI";
import TextInput from "../components/elements/TextInput";

type ChatState = {
    messages: ChatMessageProps[];
}


const Chat = () => {
    const [state, setState] = useState<ChatState>({messages: []});

    useEffect(() => {
        const last = state.messages.at(-1);
        if(last && last.from.toLowerCase() == "human")
            (async() => {
                const response = await OpenAI.Singleton.getResponse(state.messages.map(msg => `${msg.from}:\n${msg.message}`).join("\n"));
                setState({messages: [...state.messages,
                    {from: "AI", message: response.data.choices[0].text as string}
                ]});
            })();
    }, [state.messages])

    return (
        <div className="bg-white border p-2" style={{borderRadius: 5}} >
            <div className="bg-danger p-2 text-white text-center mb-2">
                Chat is not working in live version, no API key supplied to avoid missuse
            </div>
            <h1 className="h2 text-center">Chat</h1>
            <hr />
            <div style={{minHeight: "20rem"}}>
                {state.messages.map(i => <ChatMessage from={i.from} message={i.message} />)}

            </div>
            <hr />
            <TextInput 
                buttonText="Send" 
                onSubmit={(text) => setState({messages: [...state.messages, {from: "Human", message: text}]})} 
                formStyling={{width: "100%", display: "flex", height: "2rem"}} 
                textboxStyling={{flex: 2}} 
                buttonStyling={{flex: 1}} 
            />
        </div>
    )
}

export default Chat;