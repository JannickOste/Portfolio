export type SkillBarProps = {
    name: string, 
    progress: number
}

const SkillBar = ({name, progress}:SkillBarProps) => (
<div>
    <p className="w-100 text-center d-block" >{name}</p>
    <hr />
    <div className="progress my-3">
        <div className={"progress-bar progress-bar-striped "+(progress > 25 && progress < 75 ? "text-dark " : "")+"bg-"+(progress <= 25 ? "danger" : progress < 75 ? "warning" : "success")} role="progressbar" style={{width: `${progress}%`}}>
            <strong>{progress}%/100%</strong>
        </div>
    </div>
    <hr />
</div>);

export default SkillBar;