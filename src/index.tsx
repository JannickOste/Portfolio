import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Index from './pages/Index';
import Github from './pages/api/Github';
import Projects from './pages/Projects';
import ContactForm from './pages/Contact';
import { ProjectInfoProps } from './components/elements/groups/projects/ProjectInfo';
import QuizApp from './components/projects/QuizApp';
import TodoApp from './components/projects/Todo';
import LocalStorage from './components/projects/LocalStorage';
import Pokemon from './components/projects/Pokemon';
import { SkillBarProps } from './components/elements/groups/skills/SkillBar';
import { RouteObjectExtended } from './RoutedObjectExtended';
import Application from './App';
import OpenAIPage from './pages/api/OpenAI';

//#region Application data.
const projectDetails: ProjectInfoProps[] = [
  {
      name: "Quiz applicatie", 
      description: "Deze code is een voorbeeld van een React applicatie, genaamd \"labo5-quizapp\". De applicatie maakt gebruik van useEffect om de fetch API te gebruiken om data op te halen. De applicatie heeft twee soorten vragen: multiple choice en true/false, en het maakt gebruik van twee componenten, genaamd MultipleChoiceQuestion en TrueFalseQuestion om deze vragen te tonen. Er is ook een Question component dat de juiste vraag component toont op basis van het type vraag. Als de gebruiker op een antwoord klikt, wordt er aan de hand van een kleur aangegeven of het antwoord juist of fout is en daarna wordt het antwoord getoond en kan de gebruiker niet meer van antwoord veranderen. Onderaan de pagina staat een knop met de tekst \"Load More\" die de volgende 10 vragen laadt. De vragen worden opnieuw opgehaald van de API en de vragen die al getoond of beantwoord zijn blijven in de lijst staan. Er is ook een loading indicator die getoond wordt totdat de data geladen is (ook bij het laden van de volgende 10 vragen). Alle state wordt bewaard in de QuizApp component en de Question componenten gebruiken de state van de QuizApp component via props en callbacks. De code maakt ook gebruik van de html-entities package om de html entities te decoderen die meegeleverd worden in de API. Dit zorgt ervoor dat speciale tekens zoals quotes goed weergegeven worden in plaats van als HTML entiteiten.",
      renderElement: <QuizApp />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/QuizApp.tsx"
  }, 
  {
      name: "To-do lijst",
      description: "De bovenstaande code is voor een to-do app. Het bevat drie componenten, TodoItem, TodoInput en TodoList, die respectievelijk een enkele taak, het invoerveld en de lijst met taken weergeven. De state van de to-do's bevindt zich in de TodoApp component en wordt doorgegeven aan de nieuwe componenten via props. Child-to-parent communicatie wordt gebruikt om de state te updaten. Elke component staat in een aparte bestand.",
      renderElement: <TodoApp />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/Todo.tsx"
  },
  {
      name: "Dad Joke",
      description: "De code is een React-component genaamd DadJoke. Deze component laadt een \"awkward dad joke\" van de API https://icanhazdadjoke.com/. De functie loadJoke is een functie die deze data ophaalt. De functie wordt opgeroepen wanneer het component geladen wordt. Dit gebeurt met behulp van de useEffect hook. Eenmaal de data geladen is, toont de component de joke in een <div> element met behulp van een kaartje. Er is ook een \"New Joke\" knop onder de joke die de gebruiker kan gebruiken om een nieuwe joke op te halen. Er is ook een knop \"Set as favorite\" die de huidige joke opslaat in de localStorage van de browser. Bij het opstarten van de applicatie, wordt de laatst opgeslagen joke getoond. Dit gebeurt met behulp van de useEffect hook.",
      renderElement: <LocalStorage />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/LocalStorage.tsx"
  },
  {
      name: "Pokedex",
      description: `Deze code is een voorbeeld van een React component genaamd Pokemon. Het maakt gebruik van het useEffect hook om de fetch API te gebruiken om gegevens van Pokémon op te halen vanaf de PokeAPI. De component heeft ook een input veld waar gebruikers de naam van een Pokémon kunnen invoeren om de lijst te filteren op Pokémon met die naam. Er zijn ook twee input velden waarmee gebruikers het startnummer en het aantal Pokémon dat opgehaald moet worden kunnen aanpassen. De component toont vervolgens een lijst met Pokémon die voldoen aan de filtercriteria. De state van de component wordt bewaard in het state object en gebruikt useState om te updaten wanneer de gebruiker input invoert.`,
      renderElement: <Pokemon />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/Pokemon.tsx"
  }
]

const skillDisplays: {name:string, entries:SkillBarProps[]}[] = [
  {
      name: "Backend",
      entries: [
          {name: "Java", progress: 45},
          {name: "C#", progress: 85},
          {name: "Python", progress: 70},
          {name: "C++", progress: 25},
      ]
  },
  {
      name: "Web ",
      entries: [
          {name: "HTML", progress: 80},
          {name: "CSS", progress: 60},
          {name: "PHP", progress: 45},
          {name: "Javascript / Typescript", progress: 65},
      ]
  },
  
  {
      name: "Misc",
      entries: [
          {name: "GIT", progress: 70},
          {name: "Unity", progress: 50},
          {name: "MySQL", progress: 55},
          {name: "Security", progress: 35},
          {name: "Autohotkey", progress: 40}
      ]
  }
]
const routes: RouteObjectExtended[] = 
[
    {
        path: "",
        element: <Index skills={skillDisplays} />,
        text: "Home"
    },
    {
        path: "",
        text: "API\'s",
        children: [
            {
                path: "/api/github",
                text: "Github",
                element: <Github />
            },
            {
                path: "/api/openai",
                element: <OpenAIPage />,
                text: "OpenAI"
            }
        ]
    },
    {
        path: "/projects", 
        element: <Projects projects={projectDetails.sort((a, b) => a.name.localeCompare(b.name))}/>,
        text: "Projecten"
    },
    {
        path: "/contact",
        element: <ContactForm />,
        text: "Contact"
    }
]
//#endregion

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Application routes={routes} projects={projectDetails} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
