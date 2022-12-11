export type SkillBarProps = {
    name: string, 
    progress: number
}

const SkillBar = ({name, progress}:SkillBarProps) => (
<div>
    <div className="row">
        <span className="col-3">{name}</span>
        
        <div className="col-9">
            <div className="progress my-3 ">
                <div className={"progress-bar progress-bar-striped "+(progress > 25 && progress < 75 ? "text-dark " : "")+"bg-"+(progress <= 25 ? "danger" : progress < 75 ? "warning" : "success")} role="progressbar" style={{width: `${progress}%`}}>
                    <strong>{progress}%/100%</strong>
                </div>
            </div>
        </div>
    </div>
</div>);

export default SkillBar;