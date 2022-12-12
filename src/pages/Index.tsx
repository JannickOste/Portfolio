import React from "react";
import { useEffect, useState } from "react";
import GithubAPI, { GithubAPIRepositoryResult, GithubProfileAPIResult } from "../apis/Github";
import GithubRepoCard from "../components/elements/groups/github/GithubRepoCard";
import { SkillBarProps } from "../components/elements/groups/skills/SkillBar";
import SkillDisplay from "../components/elements/groups/skills/SkillDisplay";
import ContentBox from "../components/elements/ContentBox";
import Message, { MessageLevel } from "../components/elements/Message";


type IndexProps = {
    skills: {name:string, entries:SkillBarProps[]}[]
}

type IndexState = {
    repositories:GithubAPIRepositoryResult[];
    profile?:GithubProfileAPIResult;
    repoError?:boolean;
}

/**
 * Index is a React component that displays the author's profile and repository
 * information from GitHub, as well as some statistics about the author's
 * repositories.
 *
 * When the component is mounted, it fetches the profile and repository
 * information from the GitHub API using the `componentDidMount` method. The
 * fetched information is then displayed in the `render` method.
 *
 * The `getGithubProfile` method is used to generate the JSX for the
 * GitHub profile information that is displayed in the `render` method.
 */
export default class Index extends React.Component<IndexProps, IndexState>
{
    state: Readonly<IndexState> = {
        repositories: []
    }
    
    /**
     * componentDidMount is a method that is called when the `Index` component is
     * mounted.
     *
     * This method fetches the profile and repository information for the
     * author's GitHub profile from the GitHub API. If there is an error fetching
     * the information, an error message is displayed. Otherwise, the fetched
     * information is added to the component state and displayed.
     */
    componentDidMount = async(): Promise<void>  => {
        try
        {
            this.setState({...this.state, 
                repositories: await GithubAPI.getProfileRepositories(process.env.REACT_APP_AUTHOR_GITHUB_PROFILE as string), 
                profile: await GithubAPI.getProfile(process.env.REACT_APP_AUTHOR_GITHUB_PROFILE as string)
            })
        }
        catch(e)
        {
            this.setState({...this.state, repoError:true})
        }
    }

    /**
     * render is a method that returns the JSX for the `Index` component.
     *
     * The JSX includes the author's profile information, a list of the
     * author's latest updated repositories, and some statistics about the
     * author's repositories.
     *
     * If there is an error fetching the profile or repository information,
     * an error message is displayed.
     *
     * @returns The JSX for the `Index` component.
     */
    public render = (): React.ReactNode => {
        
        return (
            <div className="row-lg d-md-flex justify-content-lg-between flex-md-column flex-lg-row">
            <div className="col-lg-6 d-lg-flex flex-column justify-content-between">
                <Message level={MessageLevel.WARNING} content="Website in development, features zullen nog wijzigen!" className="mb-5" />
                <ContentBox header="Introductie"content={(
                    <>
                    <img src="./me.png" about="Author image" className="d-none d-xl-block  float-md-end"  />

                    <p className="ml-5 text-justify">
                        Beste bezoeker van mijn portfolio,<br /><br />
                        Mijn naam is Oste Jannick en ik ben een voormalige hobbyistische software-ontwikkelaar die nu studeert aan de AP in Antwerpen om mijn passie voor programmeren te volgen en mijn droom om hiervan mijn werk te maken te verwezenlijken. In het verleden heb ik al ervaring opgedaan met verschillende programmeertalen, zoals HTML, CSS, JavaScript, TypeScript, PHP, C#, C++, Python en tot slote Java 
                        <br /><br />
                        In mijn portfolio kunt u enkele van mijn schoolprojecten bekijken, zoals mijn quizApp, mijn todo-lijst, mijn pokedex, mijn random dad joke, mijn slot machine en nog veel meer! Daarnaast kunt u meer te weten komen over mijn achtergrond en ervaring. Als u vragen heeft of interesse heeft om met mij samen te werken, aarzel dan niet om contact met mij op te nemen.
                        <br /><br />
                        Ik kijk ernaar uit om van u te horen.
                        <br /><br />
                        <hr />
                        <u className="d-flex justify-content-end">Oste Jannick</u>
                    </p>
                    </>
                )} />


                <ContentBox header="Laaste 5 geupdate repositories" className="mt-sm-5" content={(
                    <>
                        {this.state.repoError ? <>Er ging iets miss bij het laden van de github data...</> : <></>}
                        {this.state.repositories.sort((a, b) => GithubAPI.stringToDate(a.updated_at as string).getTime() < GithubAPI.stringToDate(b.updated_at as string).getTime() ? 1 : -1).slice(0, 5).map(repo => (<GithubRepoCard repo={repo} />))}
                    </>
                )} />
            </div>

            <div className="col-lg-5 w-md-100 d-flex justify-content-between flex-column">
                <ContentBox header="Github statistieken" content={(
                        <>
                        <div className="row">
                            <p className="col-4"><u>Publieke repositories</u>:</p>
                            <p className="col-4"><u>Volgers</u>:</p>
                            <p className="col-4"><u>Gebruikers sinds</u></p>
                        </div>
                        <div className="row">
                            <p className="col-4">{this.state.profile?.public_repos}</p>
                            <p className="col-4">{this.state.profile?.followers}</p>
                            <p className="col-4">{this.state.profile ? GithubAPI.stringToDate(this.state.profile?.created_at as string).toLocaleDateString() : ""}</p>
                        </div>
                        </>
                )} />

                {this.props.skills.map((display, rootI) => {
                    return (<ContentBox key={rootI} header={display.name} className={`w-md-100 w-100 mt-sm-5`} content={(<SkillDisplay skills={display.entries} />)} />)
                })}
            </div>

        </div>
        )
    }
}