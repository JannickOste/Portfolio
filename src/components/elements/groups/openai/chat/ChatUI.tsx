import React from "react";
import SearchBox from "../../../SearchBox";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

type ChatUIState = {}
type ChatUIProps = {
    messages:ChatMessageProps[];
    onSend:(text:string) => void;
}

export default class ChatUI extends React.Component<ChatUIProps, ChatUIState>
{
    state:ChatUIState={}
    constructor(props: ChatUIProps) { super(props); }

    public render = ():React.ReactNode => (
         <>
            <hr />
            <div>   
                {this.props.messages.map((v, i) => <ChatMessage key={i} from={v.from} message={v.message} background={v.from !== "AI" ? "success" : "info"} alignEnd={v.from !== "AI"}/>)}
            
            </div>
            {this.props.messages.length ? <hr /> : <></>}

            <SearchBox 
                buttonText="Send" 
                onSubmit={this.props.onSend} 
                formClassName={"row d-flex justify-content-between mx-2"}
                textboxClassName={"col-10"}
                buttonClassName="btn btn-success form-group col-2 ml-auto d-block "
            />
         </>
    )
}