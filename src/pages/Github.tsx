import React, { useState } from "react";
import GithubAPI, { GithubAPIRepositoryResult, GithubProfileAPIResult } from "../apis/Github";
import SearchBox from "../components/elements/SearchBox";
import GithubProfileCard from "../components/elements/groups/github/GithubProfileCard";
import GithubRepoCard from "../components/elements/groups/github/GithubRepoCard";
import ContentBox from "../components/elements/ContentBox";
import SubpageLoader, { SubPageLayoutComponentProps } from "../components/elements/SubpageLoader";
import Message, { MessageLevel } from "../components/elements/Message";
import { Link } from "react-router-dom";

type GithubProfileSearchResult = {
    profile: GithubProfileAPIResult;
    repositories: GithubAPIRepositoryResult[];
}

type GithubUIState = {
    profiles?:GithubProfileSearchResult[];
    repositories?:GithubAPIRepositoryResult[];
    error?:string;
}

/**
 * GithubSearch is a React component that allows a user to search for
 * GitHub profiles by name and view the profile and repository information
 * for the found profiles.
 *
 * The component includes a search box where the user can enter a GitHub
 * profile name and submit the search. When the search is submitted, this
 * component fetches the profile and repository information from the GitHub
 * API and displays it.
 *
 * If there is an error with the search, an error message is displayed.
 */
export default class Github extends React.Component<{}, GithubUIState>
{
    private readonly entriesEachPage = 25;
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
                        
                    {this.state.repositories ? this.state.repositories.map(repo => <ContentBox className="my-2" content={<>
                        
                        <GithubRepoCard  repo={repo} />

                    </>
                    } />) : <></>}
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
            
        {this.state.error ? <Message level={MessageLevel.ERROR} text={this.state.error} /> : <></>}
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

    /**
     * getProfileSearchHeader is a method that returns the JSX for the search
     * box at the top of the GithubSearch component.
     *
     * The JSX includes a search box with a "Search" button, as well as a
     * placeholder text to indicate what the user should enter in the search
     * box. When the user submits the search, the `onSearch` method is called.
     *
     * @returns The JSX for the search box at the top of the GithubSearch
     *          component.
     */
    private getProfileSearchHeader = () => <ContentBox content={(<>
        <SearchBox 
            buttonText="Search" 
            onSubmit={this.onProfileSearch}
            formClassName="row"
            textboxClassName="col-sm-8"
            buttonClassName="col-sm-4"
            placeholder="Enter github profile name"
    /></>)} className="mb-2" />

    /**
     * onSearch is an event handler that is called when the user submits a
     * search in the search box.
     *
     * When this method is called, it attempts to fetch the profile and
     * repository information for the given GitHub profile name using the
     * GitHub API. If the profile or repository information cannot be fetched
     * (e.g. due to an error), an error message is displayed. Otherwise, the
     * fetched information is added to the component state and displayed.
     *
     * @param name The name of the GitHub profile to search for.
     */
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
            this.setState({...this.state, repositories: repoResult.items.slice(0, 50), error: ""})
        else this.setState({...this.state, error: "Geen resultaten gevonden voor de zoekopdracht: "+name})
    }

    /**
     * getGithubProfileElements is a method that returns the JSX for the
     * profile and repository information that is displayed for each
     * successfully searched GitHub profile.
     *
     * The JSX includes a `GithubProfile` component to display the profile
     * information, followed by a list of `GithubRepoCard` components to
     * display the repository information for the profile.
     *
     * If there are no profiles in the component state, an empty JSX element
     * is returned.
     *
     * @returns The JSX for the profile and repository information for each
     *          successfully searched GitHub profile.
     */
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

    private getProfileSearchUI = () => (
        <>
            {this.getProfileSearchHeader()}
            {this.state.error ? <ContentBox content={(<div className="bg-danger p-2 text-center text-white">{this.state.error}</div>)} /> : (<></>) }
                {this.getGithubProfileElements()}
        </>
    )

    /**
     * render is a method that returns the JSX for the `GithubSearch` component.
     *
     * The JSX includes a search box at the top of the component, followed by
     * the profile and repository information for each successfully searched
     * GitHub profile.
     *
     * If there is an error with a search, an error message is displayed.
     *
     * @returns The JSX for the `GithubSearch` component.
     */
    public render = (): React.ReactNode => {
        return (<SubpageLoader header={this.pageHeader} pages={this.pageMapping} footer={this.pageFooter} />)
    }
}
