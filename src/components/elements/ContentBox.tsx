import React from "react";
type ContentBoxProps = {
    content:JSX.Element;
    className?:string;
    style?:React.CSSProperties;
    header?:string;
    onClickHeader?:() => void;
}

export default class ContentBox extends React.Component<ContentBoxProps>
{
    constructor(props: ContentBoxProps) { super(props); }

    public render = (): React.ReactNode => (
        <div id={this.props.header?.replace(" ", "").toLocaleLowerCase()} className={`bg-white p-5 ${this.props.className}`} style={{borderRadius: 5,...this.props.style}}>
            {this.props.header ? (<><strong className="h1 w-100 d-block" onClick={this.props.onClickHeader}>{this.props.header}</strong><hr/></>) : (<></>)}
            
            {this.props.content}
        </div>)
}