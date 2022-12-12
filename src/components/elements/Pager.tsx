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
        
        const menuWidth = [... Array(pages).keys()];
        return (
            <>
                {this.props.elements.slice(this.state.currentPage*this.props.elementsEachPage, (this.state.currentPage+1)*this.props.elementsEachPage)}
                <ContentBox className="row d-flex justify-content-center" content={<div className="col-3 d-flex justify-content-between">
                    {[0, ...[...menuWidth].filter(i => i > 0 && i < pages)].map((n, i) => {
                        const index = i !== 0 && i !== menuWidth.length ? (n+1) : n+1;
                        const onClick = (ev: any) => {
                            this.setState({...this.state, currentPage: parseInt(ev.currentTarget.textContent as string)-1});
                        }
                        
                        return (
                            <>
                            
                            {n === this.state.currentPage 
                                ? <u>{index}</u>
                            : <span key={i} onClick={onClick} style={{cursor:"pointer"}} >
                                {(index)}
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