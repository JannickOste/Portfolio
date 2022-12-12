import React from "react"
import ContentBox from "./ContentBox"

type VerticalMenuEntry = {
    text:string;
    onclick:()=>void;
}

type VerticalMenuProps = {
    entries:VerticalMenuEntry[];
    containerClassName?:string;
    inputClassName?:string;
}

export default class VerticalMenu extends React.Component<VerticalMenuProps>
{
    public render = (): React.ReactNode => {

        return (<ContentBox content={
            <div className={`d-flex flex-column justify-content-between ${this.props.containerClassName}`}>
                {this.props.entries.map((v, i) => 
                    <input type="button" className={`btn btn-success my-1 ${this.props.inputClassName}`} value={v.text} onClick={v.onclick} key={i} />
                )}
            </div>
        } />)
    }
}