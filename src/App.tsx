import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from "react-router-dom";
import { ProjectInfoProps } from "./components/elements/ProjectInfo";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import LocalStorage from "./components/projects/LocalStorage";
import Pokemon from "./components/projects/Pokemon";
import QuizApp from "./components/projects/QuizApp";
import TodoApp from "./components/projects/Todo";
import Chat from "./pages/Chat";
import ContactForm from "./pages/Contact";
import Index from "./pages/Index";
import PageNotFound from "./pages/PageNotFound";
import Projects from "./pages/Projects";

const projectDetails: ProjectInfoProps[] = [
    {
        name: "Quiz App", 
        description: "Deze code is een voorbeeld van een React applicatie, genaamd \"labo5-quizapp\". De applicatie maakt gebruik van useEffect om de fetch API te gebruiken om data op te halen. De applicatie heeft twee soorten vragen: multiple choice en true/false, en het maakt gebruik van twee componenten, genaamd MultipleChoiceQuestion en TrueFalseQuestion om deze vragen te tonen. Er is ook een Question component dat de juiste vraag component toont op basis van het type vraag. Als de gebruiker op een antwoord klikt, wordt er aan de hand van een kleur aangegeven of het antwoord juist of fout is en daarna wordt het antwoord getoond en kan de gebruiker niet meer van antwoord veranderen. Onderaan de pagina staat een knop met de tekst \"Load More\" die de volgende 10 vragen laadt. De vragen worden opnieuw opgehaald van de API en de vragen die al getoond of beantwoord zijn blijven in de lijst staan. Er is ook een loading indicator die getoond wordt totdat de data geladen is (ook bij het laden van de volgende 10 vragen). Alle state wordt bewaard in de QuizApp component en de Question componenten gebruiken de state van de QuizApp component via props en callbacks. De code maakt ook gebruik van de html-entities package om de html entities te decoderen die meegeleverd worden in de API. Dit zorgt ervoor dat speciale tekens zoals quotes goed weergegeven worden in plaats van als HTML entiteiten.",
        renderElement: <QuizApp />
    }, 
    {
        name: "Todo",
        description: "",
        renderElement: <TodoApp />
    },
    {
        name: "DadJoke",
        description: "De code is een React-component genaamd DadJoke. Deze component laadt een \"awkward dad joke\" van de API https://icanhazdadjoke.com/. De functie loadJoke is een functie die deze data ophaalt. De functie wordt opgeroepen wanneer het component geladen wordt. Dit gebeurt met behulp van de useEffect hook. Eenmaal de data geladen is, toont de component de joke in een <div> element met behulp van een kaartje. Er is ook een \"New Joke\" knop onder de joke die de gebruiker kan gebruiken om een nieuwe joke op te halen. Er is ook een knop \"Set as favorite\" die de huidige joke opslaat in de localStorage van de browser. Bij het opstarten van de applicatie, wordt de laatst opgeslagen joke getoond. Dit gebeurt met behulp van de useEffect hook.",
        renderElement: <LocalStorage />
    },
    {
        name: "Pokedex",
        description: `Deze code is een voorbeeld van een React component genaamd Pokemon. Het maakt gebruik van het useEffect hook om de fetch API te gebruiken om gegevens van Pokémon op te halen vanaf de PokeAPI. De component heeft ook een input veld waar gebruikers de naam van een Pokémon kunnen invoeren om de lijst te filteren op Pokémon met die naam. Er zijn ook twee input velden waarmee gebruikers het startnummer en het aantal Pokémon dat opgehaald moet worden kunnen aanpassen. De component toont vervolgens een lijst met Pokémon die voldoen aan de filtercriteria. De state van de component wordt bewaard in het state object en gebruikt useState om te updaten wanneer de gebruiker input invoert.`,
        renderElement: <Pokemon />
    },
]

const Master = () => {
    return (
        <>
        <Header />
        <main className="m-5" style={{minHeight: "100%"}}>
            <Outlet />
        </main>
        <Footer />
        </>
    )
}

const routeObjects: RouteObject[] = [{
    path: "/", 
    element: <Master />,
    children: [
        {
            path: "",
            element: <Index />
        },
        {
            path: "/projects", 
            element: <Projects projects={projectDetails.sort((a, b) => a.name.localeCompare(b.name))}/>
        },
        {
            path: "/Chat",
            element: <Chat />
        },

        {
            path: "/contact",
            element: <ContactForm />
        }
    ], 
    errorElement: <PageNotFound />
}];
const router = createBrowserRouter(routeObjects);    

const App = () => {
    return (
        <>
        <RouterProvider router={router} />  
        </>
    )
}

export default App;