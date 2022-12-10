import { useEffect, useState } from "react";
import GithubAPI, { GithubAPIRepositoryResult } from "../apis/Github";
import { skillInfo } from "../App";
import GithubProfile from "../components/elements/groups/github/GithubProfile";
import GithubRepoCard from "../components/elements/groups/github/GithubRepoCard";
import SkillDisplay from "../components/elements/groups/skills/SkillDisplay";
import ContentBox from "../components/layout/ContentBox";

type IndexState = {
    repositories:GithubAPIRepositoryResult[];
    repoError?:boolean;
}

const Index = () => {
    const [state, setState] = useState<IndexState>({repositories:[]});

    useEffect(() => {
        (async() => {
            try
            {
                setState({...state, repositories: await GithubAPI.getRepositories(process.env.REACT_APP_AUTHOR_GITHUB_PROFILE as string)})
            }
            catch(e)
            {
                setState({...state, repoError:true})
            }
        })();
    }, []);

    return (
        <>
        <div className="row-lg d-md-flex justify-content-lg-between flex-md-column flex-lg-row">
            <div className="col-lg-5">
                <ContentBox header="Introductie"content={(
                    <>
                    <img src="./me.png" about="Author image" className="float-md-end" style={{ maxWidth:200}} />

                    <p className="ml-5 text-justify">
                        Beste bezoeker van mijn portfolio,<br /><br />
                        Mijn naam is Oste Jannick en ik ben een voormalige hobbyistische software-ontwikkelaar die nu studeert aan de AP in Antwerpen om mijn passie voor programmeren te volgen en mijn droom om hiervan mijn werk te maken te verwezenlijken. In het verleden heb ik al ervaring opgedaan met verschillende programmeertalen, zoals HTML, CSS, JavaScript, TypeScript, PHP, C#, C++, Python en tot slote Java 
                        <br /><br />
                        In mijn portfolio kunt u enkele van mijn schoolprojecten bekijken, zoals mijn quizApp, mijn todo-lijst, mijn pokedex, mijn random dad joke, mijn slot machine en nog veel meer! Daarnaast kunt u meer te weten komen over mijn achtergrond en ervaring. Als u vragen heeft of interesse heeft om met mij samen te werken, aarzel dan niet om contact met mij op te nemen.
                        <br /><br />
                        Ik kijk ernaar uit om van u te horen.
                        <br /><br />
                        <hr />
                        <div className="d-flex justify-content-end">Oste Jannick</div>
                    </p>
                    </>
                )} />

                <ContentBox header="Laaste 5 updated github repositories" className="my-5" content={(
                    <>
                        {state.repoError ? <>Er ging iets miss bij het laden van de github data...</> : <></>}
                        {state.repositories.sort((a, b) => GithubAPI.stringToDate(a.updated_at as string).getTime() < GithubAPI.stringToDate(b.updated_at as string).getTime() ? 1 : -1).slice(0, 5).map(repo => (<GithubRepoCard repo={repo} />))}
                    </>
                )} />
            </div>
                
            <ContentBox header="Skills" className="col-lg-6 w-md-100" content={(<SkillDisplay skills={skillInfo} />)} />

        </div>

        </>
    )
}

export default Index;

/*
import { skillInfo } from "../App";
import SkillDisplay from "../components/elements/SkillDisplay";
import ContentBox from "../components/elements/ui/ContentBox";

const Index = () => {
    return (
        <section>
            <ContentBox content={(
                <>
                    Hello world
                </>
            )} />
            <article className="d-md-flex">
                <ContentBox content={(
                    <>
                        <img src="./me.png" className="m-md-5" style={{maxWidth: 256, maxHeight: 256,  float: "right"}} />
                        <strong className="h1">Introductie</strong>
                        <hr />
                        <p className="ml-5 text-justify">
                            Beste bezoeker van mijn portfolio,<br /><br />
                            Mijn naam is Oste Jannick en ik ben een voormalige hobbyistische software-ontwikkelaar die nu studeert aan de AP in Antwerpen om mijn passie voor programmeren te volgen en mijn droom om hiervan mijn werk te maken te verwezenlijken. In het verleden heb ik al ervaring opgedaan met verschillende programmeertalen, zoals HTML, CSS, JavaScript, TypeScript, PHP, C#, C++, Python en tot slote Java 
                            <br /><br />
                            In mijn portfolio kunt u enkele van mijn schoolprojecten bekijken, zoals mijn quizApp, mijn todo-lijst, mijn pokedex, mijn random dad joke, mijn slot machine en nog veel meer! Daarnaast kunt u meer te weten komen over mijn achtergrond en ervaring. Als u vragen heeft of interesse heeft om met mij samen te werken, aarzel dan niet om contact met mij op te nemen.
                            <br /><br />
                            Ik kijk ernaar uit om van u te horen.
                            <br /><br />
                            Met vriendelijke groet,
                            Oste Jannick
                        </p>
                    </>
                )} />

                <ContentBox content={<SkillDisplay skills={skillInfo} />} />
                
            </article>
        </section>
    )
}

export default Index;
*/