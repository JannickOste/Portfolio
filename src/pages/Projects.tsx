import { ReactElement, useRef, useState } from "react";
import { useFormAction, useSearchParams } from "react-router-dom";
import ProjectInfo, { ProjectInfoProps } from "../components/elements/groups/projects/ProjectInfo";
import ContentBox from "../components/layout/ContentBox";

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
    //const params = Object.fromEntries(window.location.search.substring(1)?.split("&").map(s => s.split("=")).filter(i => i.length == 2));

    return (
        <section>
            <ContentBox content={(<>Klik op een hoofding om de info en het project te weergeven.</>)}/>

            {projects.map((v, i) => <ProjectInfo name={v.name} description={v.description} renderElement={v.renderElement} sourceUri={v.sourceUri}/>)}
        </section>
    )
}

export default Projects;