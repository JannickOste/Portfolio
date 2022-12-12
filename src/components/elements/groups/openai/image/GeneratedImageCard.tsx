import React from "react";
import ContentBox from "../../../ContentBox";

type GeneratedImageCardProps = {
    url:string;
    searchQuery:string;
    disabled?:boolean;
}

export default class GeneratedImageCard extends React.Component<GeneratedImageCardProps>
{

    public render = ():React.ReactNode => (
        <ContentBox className="my-2" content={(<div className="row border rounded p-2">
            <div className="col-md-6 col-sm-12">
                <img src={this.props.url} className="mx-auto d-block" />
            </div>
            <div className="col-md-6 col-sm-12">
                <div className="d-flex flex-column justify-content-center" style={{height: "100%"}}>
                    <div className="row">
                        <strong className="col-6">Zoek opdracht:</strong>
                        <div className="col-6">{this.props.searchQuery}</div>
                    </div>
                </div>
                <div className="row"><input type="button" className="btn btn-success" value="Verwijderen"  /></div>
            </div>
        </div>)} />)
}