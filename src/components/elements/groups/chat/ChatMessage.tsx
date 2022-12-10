
export type ChatMessageProps = { 
    from:string;
    message:string;
    alignEnd?:boolean;
    background?:string;
}

/**
 * ChatMessage component - A component that displays a chat message with information about the sender and the message itself.
 *
 * @param from - The name of the sender of the chat message.
 * @param message - The chat message itself.
 * @param alignEnd - If true, the ChatMessage component will be aligned to the right of the container. Otherwise, it will be aligned to the left.
 * @param background - The background color of the ChatMessage component. This can be a color name (e.g. 'info') or a color code (e.g. '#ffffff'). If no value is provided, the default background color will be 'info'.
 */
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