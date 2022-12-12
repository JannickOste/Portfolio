import React from "react";
import  { GithubAPIRepositoryResult } from "../../../../apis/GithubAPI"

type GithubRepoCardProps = { repo: GithubAPIRepositoryResult}
type GithubRepoCardState = { hover:boolean; }

export default class GithubRepoCard extends React.Component<GithubRepoCardProps, GithubRepoCardState>
{
    state:GithubRepoCardState={hover:false}
    constructor(props:GithubRepoCardProps) { super(props); }

    private onMouseEnter = () => this.setState({...this.state, hover:true});
    private onMouseLeave = () => this.setState({...this.state, hover:false});
    private onClick      = () => !this.props.repo.html_url ? {} : window.location.replace(this.props.repo.html_url);

    public render = ():React.ReactNode => (
        <div className={`my-1 border p-2 rounded`} style={{...(this.state.hover ? {filter: "brightness(40%)"} : {}), ...{cursor: "pointer"}}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
            <div className="row">
                <strong className="col-6">{this.props.repo.name}</strong>
            </div>
            {this.props.repo.description ? <><hr /><pre style={{whiteSpace: "pre-wrap"}} className="text-justify">{this.props.repo.description}</pre></> : <></> }
        </div>
    )
}