import React, { useState } from "react";

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
 * ProjectInfo component - A component that displays information about a project, including a description, source code link and a custom rendering element.
 *
 * @param name - The name of the project.
 * @param description - The description of the project.
 * @param renderElement - A custom element to be rendered in the ProjectInfo component. This can be used to display additional information about the project.
 * @param sourceUri - The URI of the source code for the project. If provided, a link to the source code will be displayed in the ProjectInfo component.
 */
const ProjectInfo = ({name, description, renderElement, sourceUri}: ProjectInfoProps) => {
    const [state, setState] = useState<ProjectInfoState>();
    
    return (
        <>
            <article className="bg-white p-5 mt-2" style={{borderRadius: 5}}>
                    <strong className="display-4 w-100 d-block" onClick={() => setState({expanded: !state?.expanded})}>{name}</strong>
                    {
                        state?.expanded ? (
                            <>
                                {description !== undefined && description.length ? (
                                    <>
                                        <hr />
                                        <strong>Beschrijving:</strong>
                                        <p>
                                            {description?.split(".").map((v, i) => (<React.Fragment key={i}>{v}.<br /></React.Fragment>))}
                                        </p>
                                    </>
                                ) : (<></>)}
                                
                                {sourceUri !== undefined && sourceUri.length ? (
                                    <>
                                        <hr />
                                        Source code: <a href="https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/LocalStorage.tsx">Github</a>
                                    </>
                                ) : (<></>)}
                                
                                <hr />
                                {renderElement}
                            </>
                        ) : ""
                    }

                </article>
        </>
    )
}

export default ProjectInfo;