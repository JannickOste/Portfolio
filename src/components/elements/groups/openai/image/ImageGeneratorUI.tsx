import React from "react";
import ContentBox from "../../../ContentBox";
import SearchBox from "../../../SearchBox";
import GeneratedImageCard from "./GeneratedImageCard";

export type ImageGeneratorResult = {
    text:string;
    uri:string;
}

type ImageGeneratorUIProps = {
    images:ImageGeneratorResult[];
    onImageGenerate:(query:string) => void;
    disabled?:boolean;
}

export default class ImageGeneratorUI extends React.Component<ImageGeneratorUIProps, {}>
{
    
    render = () => {

        return (
            <>
                <ContentBox content={<SearchBox formClassName="row d-flex justify-content-between" textboxClassName="col-8 rounded" buttonClassName="btn btn-success col-3 " buttonText="Generate" onSubmit={this.props.onImageGenerate} disabled={this.props.disabled} />} />
                
                {this.props.images.map((v,i ) =><GeneratedImageCard key={i} searchQuery={v.text} url={v.uri} disabled={this.props.disabled} /> )}
            </>
        )
    }           
}