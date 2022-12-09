type SkillDisplayProps = {
    skills: SkillDefinition[]
}

interface SkillDefinition {
    name: string, 
    progress: number
}

const SkillDisplay = ({skills}: SkillDisplayProps) => 
{
    return (
        <article className="border p-4 bg-white" style={{minWidth: 320}}>
            <p className="h2 my-3">Skillset:</p>
            <hr className="mt-5" />
            {skills.map(i => (
                <>
                {i.name}
                <div className="progress my-3">
                    <div className={"progress-bar progress-bar-striped bg-"+(i.progress <= 25 ? "danger" : i.progress < 75 ? "warning" : "success")} role="progressbar" style={{width: `${i.progress}%`}}></div>
                </div>
                </>
            ))}
        </article>
    )
}

export default SkillDisplay;