import SkillDisplay from "../components/elements/SkillDisplay";

const Index = () => {
    return (
        <section>
            <article className="d-md-flex">
            <div className="mx-md-5 mb-5 p-5 bg-white w-100">
                    <img src="./me.png" className="m-md-5" style={{maxWidth: 256, maxHeight: 256,  float: "right"}} />
                    <strong className="h1">Introductie</strong>
                    <hr />
                    <p className="ml-5 text-justify">
                        Beste bezoeker van mijn portfolio,<br /><br />
                        Mijn naam is Oste Jannick en ik ben een voormalige hobbyistische software-ontwikkelaar die nu studeert aan de AP in Antwerpen om mijn passie voor programmeren te volgen en mijn droom om hiervan mijn werk te maken te verwezenlijken. In het verleden heb ik al ervaring opgedaan met verschillende programmeertalen, zoals HTML, CSS, JavaScript, TypeScript, PHP, C#, C++, Python en tot slote Java 
                        <br /><br />
                        In mijn portfolio kunt u enkele van mijn schoolprojecten bekijken, zoals mijn quizApp, mijn todo-lijst, mijn pokedex, mijn random dad joke, mijn slot machine en nog veel meer! Daarnaast kunt u meer te weten komen over mijn achtergrond en ervaring. Als u vragen heeft of interesse heeft om met mij samen te werken, aarzel dan niet om contact met mij op te nemen.
                        <br /><br />
                        Ik kijk ernaar uit om van u te horen.
                        <br /><br />
                        Met vriendelijke groet,
                        Oste Jannick
                    </p>
                </div>
                <div className="w-100">
                    <SkillDisplay skills={[
                        {name: "Javascript/Typescript", progress: 60},
                        {name: "HTML/CSS", progress: 80},
                        {name: "PHP", progress: 55},
                        {name: "C#", progress: 85},
                        {name: "Python", progress: 70},
                        {name: "Java", progress: 45},
                        {name: "C++", progress: 25},
                        {name: "GIT", progress: 80}
                    ]} />
                </div>
            </article>
        </section>
    )
}

export default Index;