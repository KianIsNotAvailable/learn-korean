import React, { useEffect, useState } from 'react';
import Verbs from '../verbs';
import './quiz.css';
import Speaker from '../images/speaker.png';
import AWS from '../aws-config';


function Quiz() {




const answers = ["To Go", "To Do", "To Talk", "To Write", "To Have", "To Come", "To Listen", "To Fall Asleep", "To Work", "To Give"];

const [randomNumber, setRandomNumber] = useState<number>(0);
const [verb, setVerb] = useState<string>('');
const [started, setStarted] = useState(false);
const [usedVerbs, setUsedVerbs] = useState<any>([]);
const [options, setOptions] = useState<any>([]);
const [english, setEnglish] = useState<string>('');


const handleVerb = () =>{
setRandomNumber(Math.floor(Math.random() * 10) + 1); //random number for random verb from the object
if (usedVerbs.includes(Verbs[randomNumber].Korean)){ //if the verb has already appeared it restarts the function
    handleVerb();
} else { //if the verb hasnt already been used, it displays
    setVerb(Verbs[randomNumber].Korean)
    setEnglish(Verbs[randomNumber].English)
    setUsedVerbs([...usedVerbs, Verbs[randomNumber].Korean]) //sets that verb as used
    setOptions([...options, Verbs[randomNumber].English]) //puts that verbs english as an option for an answer 
    console.log(verb)
    console.log(usedVerbs)
    console.log(options)
}
}
 

const addOptions = () => {
    let newOptions = [...options];
  
    while (newOptions.length < 4) {
      const newRandomAnswer = Math.floor(Math.random() * 10) + 1;
  
      if (!newOptions.includes(answers[newRandomAnswer])) {
        newOptions.push(answers[newRandomAnswer]);
      }
    }
  
    setOptions(newOptions);
  };

const [optionsProcessed, setOptionsProcessed] = useState(false);
  useEffect(() => {
    if (options.length > 0 && !optionsProcessed) {
        addOptions();
        setOptionsProcessed(true); 
    }
}, [options, optionsProcessed]);




const handleNext = () =>{
    
   setOptions(options.length = 0)
    setOptionsProcessed(false);
    handleVerb();
    
}
const handleStart = () =>{
    setStarted(true)
    handleVerb();
}

const [box, setBox] = useState<any>(null);
const [boxID, setBoxID] = useState<any>(null);
const box1 = document.getElementById('box1')?.innerHTML;
const box2 = document.getElementById('box2')?.innerHTML;
const box3 = document.getElementById('box3')?.innerHTML;
const box4 = document.getElementById('box4')?.innerHTML;
const boxID1 = document.getElementById('box1');
const boxID2 = document.getElementById("box2");
const boxID3 = document.getElementById('box3');
const boxID4 = document.getElementById('box4')
const handleBox1 = () =>{
setBox(box1)
setBoxID(boxID1);
handleAnswer();
}
const handleBox2 = () =>{
setBox(box2)
setBoxID(boxID2)
handleAnswer();
}
const handleBox3 = () =>{
setBox(box3)
setBoxID(boxID3)
handleAnswer();
}
const handleBox4 = () =>{
setBox(box4)
setBoxID(boxID4)
handleAnswer();
}

const handleAnswer = () =>{
    

    if(box === english){
         boxID.style.backgroundColor = 'green'; //if you click the correct answer it goes green
    } else {
        boxID.style.backgroundColor = 'red'; //if you click the wrong answer it goes red
        const boxArray: any = [box1, box2, box3, box4];
        const boxIDArray: any = [boxID1, boxID2, boxID3, boxID4];
        for(let i = 0; i < boxArray.length; i++){ //loops through the different boxes to check which is the correct english
            if(boxArray[i] == english && boxIDArray[i]){ //if it finds the correct english it sets the boxID with corresponding index in array to amber
                boxIDArray[i].style.backgroundColor = 'orange';
            }
        }
        
    }
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
        <h1>{verb}</h1>
        <img src={Speaker}/>
        
        </div>
        <div className='english'>
        <h1 className='box' id='box1' style={{backgroundColor: '#333'}}  onClick={handleBox1}>{options[0]}</h1>
        <h1 className='box' id='box2' onClick={handleBox2}>{options[1]}</h1>
        <h1 className='box' id='box3' onClick={handleBox3}>{options[2]}</h1>
        <h1 className='box' id='box4' onClick={handleBox4}>{options[3]}</h1>
        </div>
        <div>
            <button onClick={handleNext}>Next</button>
        </div>
        </div>}
        
    </div>
  )
}

export default Quiz