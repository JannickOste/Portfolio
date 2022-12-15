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
        const pageCount = this.props.elements.length/this.props.elementsEachPage;
        const offset = 2;
        const menuWidth = pageCount > 0 ?  [1, ...[... Array((offset *2)+1).keys()].map((s, i) => (i-offset)+this.state.currentPage).filter(i => i > 1 && i < pageCount), pageCount] : []

        
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