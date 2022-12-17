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
import { CounterList } from './components/projects/CounterList';
import Slotmachine from './components/projects/SlotMachine';
import { TicTacToe } from './components/projects/TicTacToe';
import Filtering from './components/projects/Filtering';
import SnakeGame from './components/projects/SnakeGame';
import Pong from './components/projects/Pong';
import GameOfLife from './components/projects/GameOfLife';

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
      description: `De opdracht betreft het maken van een Todo-applicatie in React. De opdracht begint met een voorgemaakte app die een lijst van taken bevat die toegevoegd en verwijderd kunnen worden. Er is ook een inputveld waarmee nieuwe taken kunnen worden toegevoegd. De opdracht vraagt om drie nieuwe componenten te maken: TodoList, TodoItem en TodoInput. TodoList bevat de lijst van taken, TodoItem bevat een enkele taak en TodoInput bevat het inputveld en de knop om een taak toe te voegen. De logica van de oorspronkelijke App component moet naar deze nieuwe componenten verplaatst worden. De state die de Todo's bevat, moet in de App component blijven en er moet gebruik gemaakt worden van props om de state door te geven aan de nieuwe componenten. Er moet ook gebruik gemaakt worden van child-to-parent communicatie om de state te kunnen updaten. Elk component moet in een aparte file staan. Aan het einde van de opdracht zal de Todo-applicatie bestaan uit vier componenten: App, TodoList, TodoItem en TodoInput. De App component bevat de state en zorgt voor de communicatie tussen de andere componenten, terwijl TodoList, TodoItem en TodoInput verantwoordelijk zijn voor het weergeven van de taken, het toevoegen van nieuwe taken en het bijhouden van de status van de taken.`,
      renderElement: <TodoApp />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/Todo.tsx"
  },
  {
      name: "Dad Joke",
      description: "De code is een React-component genaamd DadJoke. Deze component laadt een \"awkward dad joke\" van de API icanhazdadjoke. De functie loadJoke is een functie die deze data ophaalt. De functie wordt opgeroepen wanneer het component geladen wordt. Dit gebeurt met behulp van de useEffect hook. Eenmaal de data geladen is, toont de component de joke in een <div> element met behulp van een kaartje. Er is ook een \"New Joke\" knop onder de joke die de gebruiker kan gebruiken om een nieuwe joke op te halen. Er is ook een knop \"Set as favorite\" die de huidige joke opslaat in de localStorage van de browser. Bij het opstarten van de applicatie, wordt de laatst opgeslagen joke getoond. Dit gebeurt met behulp van de useEffect hook.",
      renderElement: <LocalStorage />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/LocalStorage.tsx"
  },
  {
      name: "Pokedex",
      description: `Deze code is een voorbeeld van een React component genaamd Pokemon. Het maakt gebruik van het useEffect hook om de fetch API te gebruiken om gegevens van Pokémon op te halen vanaf de PokeAPI. De component heeft ook een input veld waar gebruikers de naam van een Pokémon kunnen invoeren om de lijst te filteren op Pokémon met die naam. Er zijn ook twee input velden waarmee gebruikers het startnummer en het aantal Pokémon dat opgehaald moet worden kunnen aanpassen. De component toont vervolgens een lijst met Pokémon die voldoen aan de filtercriteria. De state van de component wordt bewaard in het state object en gebruikt useState om te updaten wanneer de gebruiker input invoert.`,
      renderElement: <Pokemon />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/Pokemon.tsx"
  },
  {
      name: "Teller lijst",
      description: `Deze code definieert een React component genaamd CounterList. Het component bevat een lijst van tellers die de gebruiker kan verhogen of verlagen. Het component bevat ook een knop om nieuwe tellers toe te voegen aan de lijst.De component gebruikt een state genaamd counters om bij te houden welke waarden de tellers hebben. De component gebruikt ook de useState hook uit React om de state te beheren en te updaten. Als een gebruiker een teller verhoogt of verlaagt, dan zal de component de waarde van de counters state bijwerken met de nieuwe waarde van de teller. Als een gebruiker een nieuwe teller toevoegt, dan zal de component de counters state bijwerken met een nieuw element met een waarde van 0.De component berekent ook de totale waarde van alle tellers door alle waarden in de counters state op te tellen. De totale waarde wordt getoond onder de lijst van tellers. Als de totale waarde groter dan 0 is, dan wordt deze weergegeven in het groen. Als de totale waarde kleiner dan`,
      renderElement: <CounterList />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/CounterList.tsx"
  },
  {
      name: "Slot machine",
      description: `Deze code definieert een React component genaamd Slotmachine. Het component simuleert een kansspel waarbij de gebruiker een aantal slots kan laten draaien en geld kan winnen of verliezen. De component bevat drie slots die afbeeldingen tonen van kersen, citroenen, meloenen, pruimen en zevens. De component bevat ook een knop waarmee de gebruiker de slots kan laten draaien.De component gebruikt een state genaamd slots om bij te houden welke afbeeldingen getoond worden op de drie slots. Het component gebruikt ook de useState hook uit React om de state te beheren en te updaten. Als de slots gedraaid worden, zal de component geld toevoegen of afnemen van de huidige hoeveelheid geld van de gebruiker, afhankelijk van of de gebruiker gewonnen of verloren heeft. De hoeveelheid geld wordt bijgehouden in de state money. De component gebruikt ook de useEffect hook om de hoeveelheid geld te updaten wanneer de waarde van de slots state verandert.`,
      renderElement: <Slotmachine />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/SlotMachine.tsx"
  },
  {
      name: "TicTacToe",
      description: `Deze code definieert een React component genaamd TicTacToe. Het component bevat een 3-op-een-rij spel waarbij twee spelers om de beurt X of 0 op het bord kunnen plaatsen. Als een speler drie van zijn of haar symbolen op een rij (horizontaal, verticaal of diagonaal) krijgt, dan wint de speler. Als het bord vol is en niemand drie symbolen op een rij heeft, dan is het spel gelijkspel. De component gebruikt een state genaamd board om bij te houden welke symbolen op het bord getoond worden. De component gebruikt ook de useState hook uit React om de state te beheren en te updaten. Als een speler een zet doet, zal de component de waarde van de board state bijwerken met het symbool van de speler op de gekozen locatie.De component gebruikt de useEffect hook om te controleren of er een winnaar is na elke zet. Als er een winnaar is, dan wordt de winner state bijgewerkt met het symbool van de winnaar. Als er geen winnaar is en het bord vol is, dan is het spel gelijkspel.`,
      renderElement: <TicTacToe />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/TicTacToe.tsx"
  },
  {
      name: "Filtering",
      description: `Deze code definieert een React component genaamd Filtering. Het component bevat een lijst van studenten met de naam, leeftijd en studiejaar als properties. Het component bevat ook een search input waar de gebruiker naar de naam van de studenten kan zoeken. Als de gebruiker typt in de search input, zal de lijst gefilterd worden op de naam van de studenten. Als er op de header van de tabel geklikt wordt, zal de lijst gesorteerd worden op de property waarop geklikt is.De code gebruikt twee states: sortField en searchText. De eerste state bevat de property waarop gesorteerd moet worden, en de tweede state bevat de tekst die gebruikt wordt om te filteren. De component is gemaakt met behulp van de useState hook uit React.`,
      renderElement: <Filtering />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/Filtering.tsx"
  },
  {
      name: "Snake game",
      description: `Het SnakeGameMainUI component is verantwoordelijk voor het weergeven van het hoofdmenu van een Snake-spel. Het component heeft twee props: setKeybinds en startGame, die respectievelijk functies zijn om de toetsenbordkoppelingen te wijzigen en het spel te starten. Het component heeft ook een optionele prop genaamd message, die een bericht weergeeft, en een prop genaamd keybindings, die een object bevat met de huidige toetsenbordkoppelingen. Het component heeft ook twee staten: currentPanel, dat een functie bevat die een JSX-element teruggeeft om te renderen, en keybindings, dat hetzelfde object bevat als de prop met dezelfde naam. Het component heeft twee functies voor het renderen van het hoofdmenu: mainUI en changeKeybindsUI. De eerste functie rendeert een knop om het spel te starten en een knop om de toetsenbordkoppelingen te wijzigen. De tweede functie rendeert een formulier waar de gebruiker de toetsenbordkoppelingen kan wijzigen en opslaan. Er is ook een type genaamd SnakeGameFood, dat een object representeert dat voedsel in het spel vertegenwoordigt. Het bevat de positie van het voedsel en het aantal \"ticks\" dat het voedsel nog heeft voordat het verdwijnt. Er is ook een type genaamd SnakeGameKeybindings, dat een object bevat met de huidige toetsenbordkoppelingen voor het spel.`,
      renderElement: <SnakeGame />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/SnakeGame.tsx"
  },
  {
      name: "Pong",
      description: `De klasse PongCanvas is een React-component dat wordt gebruikt om een spel van pong te maken dat kan worden weergegeven op een HTML canvas. Het component bevat verschillende staten en functies om de spelers, het balletje en de spelregels te beheren en te updaten. Bij het inladen van het component worden event listeners toegevoegd voor het detecteren van toetsaanslagen van de gebruiker en de canvas wordt aangepast aan de grootte van het scherm. Er is ook een interval-functie geïmplementeerd die regelmatig wordt uitgevoerd om het spel te updaten en te renderen op de canvas.`,
      renderElement: <Pong />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/Pong.tsx"
  },
  {
      name: "Game of life",
      description: `Dit is een implementatie van het Game of Life, een celautomaat ontwikkeld door de wiskundige John Horton Conway in 1970. Het is een simulatie van de evolutie van een bevolking cellen op een raster in de tijd, met elke cel die twee mogelijke staten heeft: levend of dood. De staat van elke cel in de volgende generatie wordt bepaald door de staten van zijn buren in de huidige generatie, volgens een set regels. De component gebruikt een canvas-element om de cellen weer te geven, en update de staat van de cellen op een bepaalde interval met behulp van een setInterval-methode. De functie tick berekent de nieuwe staat van de cellen op basis van de regels van het Game of Life, en de functie onCanvasUpdate tekent de cellen opnieuw op het canvas op basis van hun huidige staat. De component heeft ook een ref naar het canvas-element, wat het toelaat om toegang te krijgen tot het canvas en zijn context om erop te tekenen. Wanneer de component monteert, initialiseert het de cellen met willekeurige staten en start het de update-interval. Wanneer de component demontreert, wist het de interval om de updates te stoppen.`,
      renderElement: <GameOfLife />,
      sourceUri: "https://github.com/JannickOste/Portfolio/blob/main/src/components/projects/Pong.tsx"
  },

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
