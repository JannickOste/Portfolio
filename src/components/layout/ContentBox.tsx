import React from "react";

const ContentBox = ({content, className, style, header, onClickHeader}:{content:JSX.Element, className?:string, style?:React.CSSProperties, header?:string, onClickHeader?:() => void}) => (
    <div className={`bg-white p-5 ${className}`} style={{borderRadius: 5,...style}}>
        {header ? (<><strong className="h1 w-100 d-block" onClick={onClickHeader}>{header}</strong><hr/></>) : (<></>)}

        {content}
    </div>
);

export default ContentBox;