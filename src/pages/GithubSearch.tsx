import React, { useState } from "react";
import GithubAPI, { GithubAPIRepositoryResult, GithubProfileAPIResult } from "../apis/Github";
import SearchBox from "../components/elements/SearchBox";
import GithubProfileCard from "../components/elements/groups/github/GithubProfileCard";
import GithubRepoCard from "../components/elements/groups/github/GithubRepoCard";
import ContentBox from "../components/elements/ContentBox";

type GithubSearchResult = {
    profile: GithubProfileAPIResult;
    repositories: GithubAPIRepositoryResult[];
}

type GithubSearchState = {
    profiles?:GithubSearchResult[];
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
export default class GithubSearch extends React.Component<{}, GithubSearchState>
{
    state:GithubSearchState = {}

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
            onSubmit={this.onSearch}
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
     private onSearch = (name:string) => {
        (async() => {
            
            const profileResult = await GithubAPI.getProfile(name);
            if(profileResult.message) // error message found?
                return this.setState({...this.state, error: profileResult.message});
            
            const repositoryResult = await GithubAPI.getRepositories(name);

            this.setState({...this.state, profiles: [{
                profile: profileResult,
                repositories: repositoryResult
            }, ...this.state.profiles ? this.state.profiles : []]});
         })();
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
        return (
            <>
                {this.getProfileSearchHeader()}
                {this.state.error ? <ContentBox content={(<div className="bg-danger p-2 text-center text-white">{this.state.error}</div>)} /> : (<></>) }
                    {this.getGithubProfileElements()}
            </>
        )   
    }
}
