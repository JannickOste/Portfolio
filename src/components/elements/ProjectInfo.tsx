import { useState } from "react";

export type ProjectInfoProps = {
    name: string, 
    description?: string,
    renderElement: JSX.Element;
}

type ProjectInfoState = {
    expanded:boolean;
};

const ProjectInfo = ({name, description, renderElement}: ProjectInfoProps) => {
    const [state, setState] = useState<ProjectInfoState>();

    return (
        <>
            <article className="bg-white p-5 mt-2" style={{borderRadius: 5}}>
                    <strong className="display-4 w-100 d-block" onClick={() => setState({expanded: !state?.expanded})}>{name}</strong>
                    {
                        state?.expanded ? (
                            <>
                                <hr />
                                <strong>Beschrijving:</strong>
                                <p>
                                    {description?.split(".").map(s => (<>{s}.<br /></>))}
                                </p>
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