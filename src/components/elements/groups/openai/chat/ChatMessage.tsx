import React from "react";

export type ChatMessageState = {}
export type ChatMessageProps = { 
    from:string;
    message:string;
    alignEnd?:boolean;
    background?:string;
    sendSuccesfully?:boolean
}

export default class ChatMessage extends React.Component<ChatMessageProps, ChatMessageState>
{
    state:ChatMessageState = {}
    constructor(props: ChatMessageProps) { super(props); }

    public render = (): React.ReactNode => {
        const {from, message, alignEnd, background} = this.props;
        return (
            <div className={`border rounded p-3 my-2 text-right w-100 bg-${background} ${!background || ["success"].includes(background) ? "text-light" : "text-dark"} bg-gradient text-${alignEnd ? "end" : "start"}`} style={{borderRadius: 5}}>
                <strong>From:</strong> {from}<br />
                
                <div className="bg-light rounded bg-gradiant p-3 text-dark my-2">
                    {message}
                </div>
            </div>
        )
    }
}