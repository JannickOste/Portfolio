import { ReactElement, useState } from "react";
import ProjectInfo, { ProjectInfoProps } from "../components/elements/ProjectInfo";

type ProjectsProps = {
    projects: ProjectInfoProps[]
}


/**
 * Renders a list of project info and project components.
 *
 * @param {Object} props The props for the component.
 * @param {ProjectInfoProps[]} props.projects An array of objects representing the project info and project components to render. Each object should have a `name`, `description`, `renderElement`, and `sourceUri` property.
 * @returns {ReactElement} A React element representing the list of projects.
 */
const Projects = ({projects}: ProjectsProps) => 
{
    return (
        <section>
            <article className="bg-white mb-3 p-2" style={{borderRadius: 5}}>
                Klik op een hoofding om de info en het project te weergeven.
            </article>

            {projects.map((v, i) => <ProjectInfo name={v.name} description={v.description} renderElement={v.renderElement} sourceUri={v.sourceUri}/>)}
        </section>
    )
}

export default Projects;