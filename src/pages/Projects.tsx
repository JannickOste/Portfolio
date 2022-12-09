import { useState } from "react";
import ProjectInfo, { ProjectInfoProps } from "../components/elements/ProjectInfo";

type ProjectsProps = {
    projects: ProjectInfoProps[]
}



const Projects = ({projects}: ProjectsProps) => 
{
    return (
        <section>
            <article className="bg-white mb-3 p-2" style={{borderRadius: 5}}>
                Press header to show project info.
            </article>

            {projects.map(i => <ProjectInfo name={i.name} description={i.description} renderElement={i.renderElement} />)}
        </section>
    )
}

export default Projects;