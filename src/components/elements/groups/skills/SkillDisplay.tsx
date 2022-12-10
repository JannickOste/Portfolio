import SkillBar, { SkillBarProps } from "./SkillBar";

/**
 * SkillDisplay component - A component that displays a list of skills and their progress levels.
 *
 * @param skills - An array of skill definitions, where each skill definition is an object with a 'name' and 'progress' property. The 'name' property is the name of the skill, and the 'progress' property is a number between 0 and 100 representing the skill's progress level.
 */
const SkillDisplay = ({skills}: {skills: SkillBarProps[]}) => (<>{skills.sort((a, b) => `${b.progress}`.localeCompare(`${a.progress}`)).map((v, i) => (<SkillBar key={i} name={v.name} progress={v.progress} />))}</>);


export default SkillDisplay;