import React from "react";
import GithubAPI, { GithubProfileAPIResult } from "../../../../apis/Github";

export type GithubProfileProps = {
    profile: GithubProfileAPIResult;
}

export default class GithubProfileCard extends React.Component<GithubProfileProps>
{
    constructor(props:GithubProfileProps)
    {
        super(props);
    }

    private getEntries = () => [
        ["Publieke repositories:", this.props.profile.public_repos],
        ["Volgers:",               this.props.profile.followers],
        ["Volgt:",                 this.props.profile.following],
        ["Profiel aangemaakt op: ", GithubAPI.stringToDate(   this.props?.profile.created_at).toLocaleDateString()],
        ["Profiel laast geupdate op:", GithubAPI.stringToDate(this.props?.profile.updated_at).toLocaleDateString()]
    ];

    public render = (): React.ReactNode => (
        <>
        <div className="row border rounded p-5">
            <div className="col-md-3 col-sm-12 d-relative">
                <img src={this.props.profile.avatar_url} className="rounded mx-auto w-100 d-block"  />
            </div>

            <div className="col-md-9 col-sm-12 text-center">
                <strong className="row mb-2 d-block h1 mt-3">{this.props.profile.name}</strong>
                <hr className="mb-5"/>
                {this.getEntries().map((v, i) => (
                    <div key={i} className="row">
                        <div className="col-md-6 col-sm-12">{v[0]}</div>
                        <div className="col-md-6 col-sm-12">{v[1]}</div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
