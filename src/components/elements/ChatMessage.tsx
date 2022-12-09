
export type ChatMessageProps = { 
    from:string;
    message:string;
    alignEnd?:boolean;
    background?:string;
}

const ChatMessage = ({from, message, alignEnd, background}: ChatMessageProps) => {
    if(!background) background = "info";

    return (
        <div className={`border p-2 my-2 text-right w-100 bg-info bg-gradient`} style={{borderRadius: 5}}>
            <strong>From:</strong> {from}<br />
            <strong>Message:</strong> {message}
        </div>
    )
}

export default ChatMessage;