import React, { useState } from "react";
import GithubAPI, { GithubAPIRepositoryResult, GithubProfileAPIResult } from "../../apis/GithubAPI";
import SearchBox from "../../components/elements/SearchBox";
import GithubProfileCard from "../../components/elements/groups/github/GithubProfileCard";
import GithubRepoCard from "../../components/elements/groups/github/GithubRepoCard";
import ContentBox from "../../components/elements/ContentBox";
import SubpageLoader, { SubPageLayoutComponentProps } from "../../components/elements/SubpageLoader";
import Message, { MessageLevel } from "../../components/elements/Message";
import { Link } from "react-router-dom";
import Pager from "../../components/elements/Pager";

type GithubProfileSearchResult = {
    profile: GithubProfileAPIResult;
    repositories: GithubAPIRepositoryResult[];
}

type GithubUIState = {
    profiles?:GithubProfileSearchResult[];
    repositories?:GithubAPIRepositoryResult[];
    error?:string;
}


export default class Github extends React.Component<{}, GithubUIState>
{
    state:GithubUIState = {}
    private get pageMapping() 
    {
        return [
            {
                path: "profiles",
                text: "profiel zoeken",
                element: () => this.getProfileSearchUI()
            },
            {
                path: "repos",
                text: "repository zoeken",
                element: () => <>
                    <ContentBox content={<>
                        <SearchBox 
                            onSubmit={this.onRepoSearch} 
                            buttonText="Zoeken" 
                            placeholder="Zoek een github repository..."
                            formClassName="row d-flex justify-content-between"
                            textboxClassName="col-7"
                            buttonClassName="col-3 btn btn-success"
                        />
                    </>} />
                    
                    <Pager
                        elementsEachPage={10}
                        elements={
                            (this.state.repositories ? this.state.repositories : []).map((repo, i) => <ContentBox key={i} className="my-2" content={
                            <div className="row">
                                <div className="col-1 d-flex justify-content-center align-self-center" style={{height: "100%"}}>#{i+1}</div>
                                <div className="col-10"><GithubRepoCard repo={repo} /></div>
                            </div>
                    }/>)} />
                </> 
            }
        ]
    }

    private get pageHeader() 
    {
        return(({text}: SubPageLayoutComponentProps) => <>
        <ContentBox className="mb-2" content={<>
            <strong className="h1">Github {text}</strong>
        </>} />
            
        {this.state.error ? <Message level={MessageLevel.ERROR} content={this.state.error} /> : <></>}
        </>)
    }

    private get pageFooter() 
    {
        return(({path, triggerMainMenu}: SubPageLayoutComponentProps) => path?.length ? <ContentBox className="d-flex justify-content-end" content={<>
            <input type="button" className="btn btn-success" value="Hoofdmenu"  onClick={() => {
                if(triggerMainMenu) 
                {
                    this.setState({...this.state,error:""})
                    triggerMainMenu();
                }
            }} />
        </>} /> : <></>)
    }


    private getProfileSearchHeader = () => <ContentBox content={(<>
        <SearchBox 
            buttonText="Search" 
            onSubmit={this.onProfileSearch}
            formClassName="row d-flex justify-content-between"
            textboxClassName="col-7"
            buttonClassName="col-3 btn btn-success"
            placeholder="Enter github profile name"
    /></>)} className="mb-2" />



    private getProfileSearchUI = () => (
        <>
            {this.getProfileSearchHeader()}
            {this.state.error ? <ContentBox content={(<div className="bg-danger p-2 text-center text-white">{this.state.error}</div>)} /> : (<></>) }
                {this.getGithubProfileElements()}
        </>
    )

     private onProfileSearch = async(name:string) => {
        const profileResult = await GithubAPI.getProfile(name);
        if(profileResult.message) // error message found?
            return this.setState({...this.state, error: profileResult.message});
        
        const repositoryResult = await GithubAPI.getProfileRepositories(name);
        this.setState({...this.state, profiles: [{
            profile: profileResult,
            repositories: repositoryResult
        }, ...this.state.profiles ? this.state.profiles : []]});
    }

    private onRepoSearch = async(name:string) => {
        const repoResult = await GithubAPI.searchRepository(name);
        if(repoResult.total_count)
            this.setState({...this.state, repositories: repoResult.items, error: ""})
        else this.setState({...this.state, error: "Geen resultaten gevonden voor de zoekopdracht: "+name})
    }

    private getGithubProfileElements = () => (this.state.profiles?.length 
    ? this.state.profiles.map((v, i) => 
        <ContentBox key={i} className="mt-2" content={(
            <React.Fragment key={i}>
                <GithubProfileCard profile={v.profile} />
                <p className="mb-3">&nbsp;</p>
                {v.repositories.map((repo, repoi) => <GithubRepoCard key={repoi} repo={repo} />)}
                
            </React.Fragment>)} 
        />
    ) : [<></>]);

    public render = (): React.ReactNode => {
        return (<SubpageLoader header={this.pageHeader} pages={this.pageMapping} footer={this.pageFooter} />)
    }
}
