import React, { useState } from 'react';
import Verbs from '../verbs';
import './quiz.css';
import Speaker from '../images/speaker.png';
import TextToSpeechComponent from '../TextToSpeechComponent';


function Quiz() {

const usedVerbs: string[] = [];
let options: string[] = [];

const answers = ["To Go", "To Do", "To Talk", "To Write", "To Have", "To Come", "To Listen", "To Fall Asleep", "To Work", "To Give"];

const [randomNumber, setRandomNumber] = useState<number>(0);
const [verb, setVerb] = useState<string>('');
const [english, setEnglish] = useState<string>('');
const [randomAnswer, setRandomAnswer] = useState<number>(0);
const [started, setStarted] = useState(false);

const func = () =>{
const handleVerb = () =>{
setRandomNumber(Math.floor(Math.random() * 10) + 1); //random number for random verb from the object
if (Verbs[randomNumber].Korean in usedVerbs){ //if the verb has already appeared it restarts the function
    handleVerb();
} else { //if the verb hasnt already been used, it displays
    setVerb(Verbs[randomNumber].Korean)
    setEnglish(Verbs[randomNumber].English)
    usedVerbs.push(verb) //sets that verb as used
    options.push(english) //puts that verbs english as an option for an answer 
}
}
handleVerb();
const addOptions = () =>{
if (english in options){ //checks that the correct answer was added to options
    setRandomAnswer(Math.floor(Math.random() * 10) + 1) //generates a random index 
    if (answers[randomAnswer] in options){ //if the word is already in the options it restarts the function
        addOptions();
    } else {
        options.push(answers[randomAnswer]) //adds the answer as an option
        if (options.length < 5){ //keeps recalling the function until there are 4 options
            addOptions();
        }
    }
    }
    }
    addOptions();
}
const handleNext = () =>{
    options = [];
    func();
}
const handleStart = () =>{
    setStarted(true);
    //func(); 
}


  return (
    <div> 
        {!started && <div className='start-page'>
            <h1>Review the Korean verbs and their meaning in English then when you're ready, press start.</h1>
            <table>
                <th>Korean</th>
                <th>English</th>
                <tr><td>가다</td><td>To Go</td></tr>
                <tr><td>하다</td><td>To Do</td></tr>
                <tr><td>말하다</td><td>To Talk</td></tr>
                <tr><td>쓰다</td><td>To Write</td></tr>
                <tr><td>있다</td><td>To Have</td></tr>
                <tr><td>오다</td><td>To Come</td></tr>
                <tr><td>듣다</td><td>To Listen</td></tr>
                <tr><td>자다</td><td>To Fall Asleep</td></tr>
                <tr><td>일하다</td><td>To Work</td></tr>
                <tr><td>주다</td><td>To Give</td></tr>
            </table>
            <button onClick={handleStart}>Start</button>
        </div>}
        {started && <div className='questions'>
        <div className='korean'>
        <h1>{Verbs[2].Korean}</h1>
        <img src={Speaker}/>
        </div>
        <div className='english'>
        <h1 className='box'>English word</h1>
        <h1 className='box'>English </h1>
        <h1 className='box'>English Word</h1>
        <h1 className='box'>English Word</h1>
        </div>
        <div>
            <button onClick={handleNext}>Next</button>
        </div>
        </div>}
        
    </div>
  )
}

export default Quiz