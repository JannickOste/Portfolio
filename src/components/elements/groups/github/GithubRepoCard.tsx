import { useState } from "react";
import GithubAPI, { GithubAPIRepositoryResult } from "../../../../apis/Github"

type GithubRepoCardState = {
    hover:boolean;
}

const GithubRepoCard = ({repo}: {repo: GithubAPIRepositoryResult}) => {
    const [state, setState] = useState<GithubRepoCardState>({hover: false});

    return (
        <>
        <div className={`my-1 border p-2 rounded`} style={{...(state.hover ? {filter: "brightness(40%)"} : {}), ...{cursor: "pointer"}}} onMouseEnter={() => setState({...state, hover:true})} onMouseLeave={() => setState({...state, hover:false})} onClick={() => !repo.html_url ? {} : window.location.replace(repo.html_url)}>
            <div className="row">
                <strong className="col-6">{repo.name}</strong>
            </div>
            {repo.description ? <><hr /><pre style={{whiteSpace: "pre-wrap"}}>{repo.description}</pre></> : <></> }
            <hr />
            <div className="d-flex w-100 flex-column">
                <span className="text-end">Laatst geupdate: {GithubAPI.stringToDate(repo.updated_at as string).toLocaleDateString()} </span>
                <span className="text-end">Aangemaakt op: {GithubAPI.stringToDate(repo.created_at as string).toLocaleDateString()} </span>
            </div>
        </div>
        </>
    )
}

export default GithubRepoCard;