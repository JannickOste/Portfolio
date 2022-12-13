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
        // Todo: add proper indexing for menu
        const pages = this.props.elements.length/this.props.elementsEachPage;
        
        const menuWidth = [1, ... [... Array(pages).keys()].map((s, i) => i+this.state.currentPage).filter(v => v > 1 && v < pages && v >= this.state.currentPage-2 && v <= this.state.currentPage+2 ), pages]

        return (
            <>
                {this.props.elements.slice(this.state.currentPage*this.props.elementsEachPage, (this.state.currentPage+1)*this.props.elementsEachPage)}
                <ContentBox className="row d-flex justify-content-center" content={<div className="col-3 d-flex justify-content-between">
                    {menuWidth.map((n, i) => {
                        const onClick = (ev: any) => {
                            this.setState({...this.state, currentPage:   parseInt(ev.currentTarget.textContent as string)-1});
                        }
                        
                        return (
                            <>
                            {n === this.state.currentPage+1
                                ? <u>{n}</u>
                            : <span key={i} onClick={onClick} style={{cursor:"pointer"}} >
                                {(n)}
                            </span>}        
                            </>
    
                        )
                    }
                )}
                </div>} />
            </>
        )
    }
}