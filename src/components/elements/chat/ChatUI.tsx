import TextInput from "../TextInput";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

/**
 * ChatUI is a UI component that displays a list of chat messages and a text input for sending new messages.
 * 
 * @param messages an array of chat messages to display
 * @param onSend a callback that is called when the user submits a new message
 */
const ChatUI = ({messages, onSend}:{messages:ChatMessageProps[], onSend:(text:string) => void}) => {
    return (
        <>
            <hr />
            <div style={{minHeight: "20rem"}}>
                {messages.map((v, i) => <ChatMessage from={v.from} message={v.message} />)}

            </div>
            <hr />

            <TextInput 
                buttonText="Send" 
                onSubmit={onSend} 
                formStyling={{width: "100%", display: "flex", height: "2rem"}} 
                textboxStyling={{flex: 2}} 
                buttonStyling={{flex: 1}} 
            />
        </>
    )
}

export default ChatUI;