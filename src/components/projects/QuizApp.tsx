/*
 * Maak een nieuwe React applicatie aan met behulp van create-react-app en noem deze labo5-quizapp.
 * -> Maak een nieuw component QuizApp aan.
 * -> Maak gebruik van de https://opentdb.com/api.php?amount=10 om de quizvragen op te halen. Gebruik de fetch API om de data op te halen. Gebruik een useEffect om deze data op te halen en daarna in een state te plaatsen.
 * -> Er zijn twee soorten vragen: multiple choice en true/false. Maak een component MultipleChoiceQuestion en een component TrueFalseQuestion aan. Deze componenten worden gebruikt om de vragen te tonen. Maak een component Question aan die de juiste vraag component toont op basis van het type vraag.
 * -> Als de gebruiker op een antwoord klikt wordt er aan de hand van een kleur aangegeven of het antwoord juist of fout is. Daarna wordt het antwoord getoond en kan de gebruiker niet meer van antwoord veranderen.
 * -> Onderaan staat een button met de tekst 'Load More' die de volgende 10 vragen laadt. De vragen worden opnieuw opgehaald van de API. De vragen die al getoond of beantwoord zijn blijven in de lijst staan.
 * -> Voorzie een loading indicator die getoond wordt tot de data geladen is (ook bij het laden van de volgende 10 vragen).
 * -> Alle state moet in de QuizApp component zitten. De Question componenten mogen geen state hebben. De Question componenten moeten de state van de QuizApp componenten gebruiken via props en callbacks.
 * -> Maak gebruik van de html-entities package om de html entities te decoderen. Deze worden meegeleverd in de API. Anders krijg je bijvoorbeeld &quot; te zien in plaats van ".
*/

import { useEffect, useState } from "react";
import {decode} from "html-entities";

interface QuizAppAPIResult {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  userAnswer?:string;
}

const MultipleChoiceQuestion = ({questions, onAnswer, disabled}:{questions:string[], onAnswer:(answer:string) => void, disabled:boolean}) => {
    return(
        <div>
            <select onChange={(ev) => onAnswer(ev.target.value)} disabled={disabled}>
                {questions.map((s, i) => (<option key={i}>{s}</option>))}
            </select>
        </div>
    )
}

const TrueFalseQuestion = ({onAnswer, disabled}: {onAnswer:(answer:string) => void, disabled:boolean}) => {
    return (
    <div>
        {["True", "False"].map(s => <>
            <label htmlFor={s.toLocaleLowerCase()}>{s}:</label>
            <input type="radio" name={s.toLocaleLowerCase()} id={s.toLocaleLowerCase()} value={s} onChange={(ev) => onAnswer(ev.target.value)} disabled={disabled} />
        </>)}
    </div>)
}

const Question = ({question, options, onAnswer, correct}:{question:string, options:string[], onAnswer:(answer:string)=>void, correct?:boolean}) => {
    
    return (
        <div className="border mt-1 text-center" >
            {correct === undefined ? <></> : (
                <div className={(correct ? "bg-success" : "bg-danger")+" text-center text-white"}>
                    {correct ? "Correct!" : "Incorrect!"}
                </div>
            )}
            {decode(question)}

            {options.every(s => ["True", "False"].includes(options[0]))
                ? <TrueFalseQuestion onAnswer={onAnswer} disabled={correct !== undefined} /> 
                : <MultipleChoiceQuestion questions={options} onAnswer={onAnswer} disabled={correct !== undefined} />}
        </div>
    )
}

type QuizAppState = {   
    entries:QuizAppAPIResult[];
    pull:boolean;
}

const QuizApp = () => {
    const [state, setState] = useState<QuizAppState>({entries:[], pull: true});


    useEffect(() => {
        (async() => {
            if(state.pull || state.entries.length === 0)
            {
                const results: QuizAppAPIResult[] =(await (await fetch("https://opentdb.com/api.php?amount=10")).json()).results;

                setState({...state, entries:[...state.entries, ...results], pull: false})
            }
        })()
    }, [state.pull]);

    return (<div className="border p-2 m-1">
        {state.entries.map((v, i) => (<Question 
            key={i}
            question={v.question} 
            options={[...v.incorrect_answers, v.correct_answer].sort().map(s => decode(s))}
            onAnswer={(answer) => {
                const entries = state.entries;
                state.entries[i].userAnswer = answer;
                setState({...state, entries: entries});
            }}
            correct={v.userAnswer === undefined ? undefined : v.userAnswer === v.correct_answer}
        /> ))}
        <div className="d-flex justify-content-end">
        <input type="button" value="Load more..." onClick={() => setState({...state, pull: true})} />

        </div>
    </div>) 
}

export default QuizApp;