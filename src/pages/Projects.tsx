import React from "react";
import ProjectInfo, { ProjectInfoProps } from "../components/elements/groups/projects/ProjectInfo";
import ContentBox from "../components/elements/ContentBox";

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
export default class Projects extends React.Component<ProjectsProps>
{

    public render = (): React.ReactNode => (
        <section>
            <ContentBox content={(<>Klik op een hoofding om de info en het project te weergeven.</>)}/>
            
            {this.props.projects.map((v, i) => <ProjectInfo name={v.name} description={v.description} renderElement={v.renderElement} sourceUri={v.sourceUri}/>)}
        </section>
    )
}