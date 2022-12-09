type SkillDefinition = {
    name: string, 
    progress: number
}

/**
 * SkillDisplay component - A component that displays a list of skills and their progress levels.
 *
 * @param skills - An array of skill definitions, where each skill definition is an object with a 'name' and 'progress' property. The 'name' property is the name of the skill, and the 'progress' property is a number between 0 and 100 representing the skill's progress level.
 */
const SkillDisplay = ({skills}: {skills: SkillDefinition[]}) => 
{
    return (
        <article className="border p-4 bg-white" style={{minWidth: 320}}>
            <p className="h1 mt-4">Skillset:</p>
            <hr />
            {skills.map((v, i) => (
                <div key={i}>
                    {v.name}

                    <div className="progress my-3">
                        <div className={"progress-bar progress-bar-striped bg-"+(v.progress <= 25 ? "danger" : v.progress < 75 ? "warning" : "success")} role="progressbar" style={{width: `${v.progress}%`}}></div>
                    </div>
                </div>
            ))}
        </article>
    )
}

export default SkillDisplay;