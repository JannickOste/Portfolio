import React, { useState } from "react";
import ContentBox from "../../../layout/ContentBox";

export type ProjectInfoProps = {
    name: string, 
    description?: string,
    renderElement: JSX.Element;
    sourceUri:string;
}

type ProjectInfoState = {
    expanded:boolean;
};

/**
 * ProjectInfo component - A component that displays information about a project, including a description and a custom rendering element.
 *
 * @param name - The name of the project.
 * @param description - The description of the project.
 * @param renderElement - A custom element to be rendered in the ProjectInfo component. This can be used to display additional information about the project.
 * @param sourceUri -
 */
const ProjectInfo = ({name, description, renderElement, sourceUri}: ProjectInfoProps) => {
    const [state, setState] = useState<ProjectInfoState>();
    
    return (
        <ContentBox className="mt-2" header={name} onClickHeader={() => setState({expanded: !state?.expanded})} content={(<>
            {state?.expanded 
            ? (<>
                {description !== undefined && description.length 
                ? (<>
                    <strong>Beschrijving:</strong>
                    <p>
                        {description?.split(".").map((v, i) => (<React.Fragment key={i}>{v}.<br /></React.Fragment>))}
                    </p>
                </>) : (<></>)}

                {sourceUri !== undefined && sourceUri.length 
                ? (<>
                    <hr />
                    Source code: <a href={sourceUri}>Github</a>
                </>) : (<></>)}
                        
                <hr />
                {renderElement}

            </>) : <></>}
        </>)} />)
}

export default ProjectInfo;