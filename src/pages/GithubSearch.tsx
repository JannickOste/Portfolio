import { useState } from "react";
import GithubAPI, { GithubAPIRepositoryResult, GithubProfileAPIResult } from "../apis/Github";
import SearchBox from "../components/elements/forms/SearchBox";
import GithubProfile from "../components/elements/groups/github/GithubProfile";
import GithubRepoCard from "../components/elements/groups/github/GithubRepoCard";
import ContentBox from "../components/layout/ContentBox";

type GithubSearchResult = {
    profile: GithubProfileAPIResult;
    repositories: GithubAPIRepositoryResult[];
}

type GithubSearchState = {
    profiles:GithubSearchResult[];
    error?:string;
}

const GithubSearch = () => {
    const [state, setState] = useState<GithubSearchState>({profiles: []});
    const onSearch = (name: string) => {
        (async() => {
            
            const profileResult = await GithubAPI.getProfile(name);
            if(profileResult.message) // error message found?
                return setState({...state, error: profileResult.message});
            
            const repositoryResult = await GithubAPI.getRepositories(name);

            setState({...state, profiles: [{
                profile: profileResult,
                repositories: repositoryResult
            }, ...state.profiles]});
         })();
    }
    return(
        <>
            <ContentBox content={(<>
                <SearchBox 
                    buttonText="Search" 
                    onSubmit={onSearch}
                    formClassName="row"
                    textboxClassName="col-sm-8"
                    buttonClassName="col-sm-4"
                    placeholder="Enter github profile name"
            /></>)} className="mb-2" />
            
            {state.error ? <ContentBox content={(<div className="bg-danger p-2 text-center text-white">{state.error}</div>)} /> : (<></>) }
            

            {state.profiles.map((v, i) => <ContentBox key={i} className="mt-2" content={(
                <>
                    <GithubProfile name={v.profile.name} avatar_url={v.profile.avatar_url} public_repos={v.profile.public_repos} followers={v.profile.followers} following={v.profile.following} created_at={v.profile.created_at} updated_at={v.profile.updated_at} />
                    {v.repositories.map((repo, repoi) => <GithubRepoCard key={repoi} repo={repo} />)}
                    
                </>
            )} />)}
            </>
    )
}
//{state.profiles.map((v, i) => <ContentBox content={(<GithubProfile name={v.name} public_repos={v.public_repos}  avatar_url={v.avatar_url} followers={v.followers} following={v.following} created_at={v.created_at} updated_at={v.updated_at} />)})}
        

export default GithubSearch;