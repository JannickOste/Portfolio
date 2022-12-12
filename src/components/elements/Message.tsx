import React from "react";
import ContentBox from "./ContentBox";

export enum MessageLevel 
{
    SUCCES  = "success",
    WARNING = "warning",
    ERROR   = "danger",
    INFO    = "info"
}

export default class Message extends React.Component<{
    text:string; 
    level:MessageLevel;
    className?:string;
}>
{
    public render = (): React.ReactNode => {

        return (<ContentBox className={this.props.className} content={
            <div className={`border bg-${this.props.level} text-${[MessageLevel.WARNING].includes(this.props.level) ? "dark" : "light"} text-center py-2`}>
                {this.props.text}
            </div>
        } />);
    }
}