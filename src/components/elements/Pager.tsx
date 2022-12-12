import React from "react";
import ContentBox from "./ContentBox";

type PagerProps = {
    elements: JSX.Element[];
    elementsEachPage:number;
}

type PagerState = {
    currentPage:number;
}

export default class Pager extends React.Component<PagerProps, PagerState>
{
    state = {currentPage: 0}

    public render = () => 
    {
        const pages = this.props.elements.length/this.props.elementsEachPage;
        
        return (
            <>
                {this.props.elements.slice(this.state.currentPage*this.props.elementsEachPage, (this.state.currentPage+1)*this.props.elementsEachPage)}
                <ContentBox className="row d-flex justify-content-center" content={<div className="col-3 d-flex justify-content-between">
                    {[0, ...[...Array(5).keys()].filter(i => i > 0 && i < pages)].map((n, i) => (
                        <span onClick={(ev) => this.setState({...this.state, currentPage: parseInt(ev.currentTarget.textContent as string)-1})} style={{cursor:"pointer"}} >{n+1}</span>
                    ))}
                </div>} />
            </>
        )
    }
}