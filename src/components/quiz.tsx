import React, { useEffect, useState } from 'react';
import Verbs from '../verbs';
import './quiz.css';
import TextToSpeechComponent from '../TextToSpeechComponent'
function Quiz() {
  const answers = ["To Go", "To Do", "To Talk", "To Write", "To Have", "To Come", "To Listen", "To Fall Asleep", "To Work", "To Give"];

  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [verb, setVerb] = useState<string>('');
  const [started, setStarted] = useState(false);
  const [usedVerbs, setUsedVerbs] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [english, setEnglish] = useState<string>('');
  const [answered, setAnswered] = useState(false);
  const [incorrect, setIncorrect] = useState<any>([]);
  const [finished, setFinished] = useState(false);
  const [correct, setCorrect] = useState<number>(0);

//shuffles the options array so that the positions are random
  const shuffleArray = (array: any) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleStart = () => {
    setStarted(true);
    handleVerb();
  };
// gets a random verb and its english translation and sets the verb as used and adds the english as an optional answer
  const handleVerb = () => {
    setRandomNumber((prevRandomNumber) => {
      const newRandomNumber = Math.floor(Math.random() * 10) + 1;

      if (usedVerbs.includes(Verbs[newRandomNumber].Korean)) {
        handleVerb();
      } else {
        setVerb(Verbs[newRandomNumber].Korean);
        setEnglish(Verbs[newRandomNumber].English);
        setUsedVerbs([...usedVerbs, Verbs[newRandomNumber].Korean]);
        setOptions([...options, Verbs[newRandomNumber].English]);
      }

      return newRandomNumber;
    });
  };
// the other 3 options are random options from the list that are not repeats
  const addOptions = () => {
    let newOptions = [...options];

    while (newOptions.length < 4) {
      const newRandomAnswer = Math.floor(Math.random() * 9) + 1;

      if (!newOptions.includes(answers[newRandomAnswer])) {
        newOptions.push(answers[newRandomAnswer]);
      }
    }

    setOptions(newOptions);
  };
//adds the options once the state of options has updated
  const [optionsProcessed, setOptionsProcessed] = useState(false);
  useEffect(() => {
    if (options.length > 0 && !optionsProcessed) {
      addOptions();
      setOptionsProcessed(true);
    }
  }, [options, optionsProcessed]);
// resets everything after you click next
  const handleNext = () => {
    const resetBoxes = boxes.map((box) => ({ ...box, status: '' }));
    setBoxes(resetBoxes);

    setOptions(options.length = 0);
    setOptionsProcessed(false);
    handleVerb();
    setAnswered(false);
  };
//creates the 4 boxes for the answers
  const [boxes, setBoxes] = useState([
    { id: 1, content: '', status: '' },
    { id: 2, content: '', status: '' },
    { id: 3, content: '', status: '' },
    { id: 4, content: '', status: '' },
  ]);
// shuffles the options array so that the positions are random
  useEffect(() => {
    if (options.length > 0) {
        const shuffledOptions = shuffleArray(options);
      setBoxes((prevBoxes) =>
        prevBoxes.map((box, index) => ({
          ...box,
          content: shuffledOptions[index],
        }))
      );
    }
  }, [options]);
// checks what box was clicked, if its content === the correct answer its status is correct which makes it green
//if its incorrect the status is incorrect which makes it red and then the correct status would be pending which makes it orange
  const correctAnswer = english;
  const checkAnswer = (box: { id: any; content?: string; status?: string; }) => {
    const updatedBoxes = boxes.map((b) => {
      if (b.id === box.id) {
        if (b.content === correctAnswer) {
            setCorrect(correct + 1);
          return { ...b, status: 'correct' };
        } else {
            setIncorrect([...incorrect, verb])
          return { ...b, status: 'incorrect' };
        }
      } else if (b.content === correctAnswer) {
        return { ...b, status: 'pending' };
      } else {
        return b;
      }
    });

    setBoxes(updatedBoxes);
  };

  const handleFinish = () =>{
    setFinished(true)
  }
  const handleTryAgain = () =>{
    window.location.reload(); 
  }
  
  return (
    <div>
      {!started && !finished && (
        <div className='start-page'>
          <h1>
            Review the Korean verbs and their meaning in English then when
            you're ready, press start.
          </h1>
          <table>
            <th>Korean</th>
            <th>English</th>
            <tr>
              <td>가다</td>
              <td>To Go</td>
            </tr>
            <tr>
              <td>하다</td>
              <td>To Do</td>
            </tr>
            <tr>
              <td>말하다</td>
              <td>To Talk</td>
            </tr>
            <tr>
              <td>쓰다</td>
              <td>To Write</td>
            </tr>
            <tr>
              <td>있다</td>
              <td>To Have</td>
            </tr>
            <tr>
              <td>오다</td>
              <td>To Come</td>
            </tr>
            <tr>
              <td>듣다</td>
              <td>To Listen</td>
            </tr>
            <tr>
              <td>자다</td>
              <td>To Fall Asleep</td>
            </tr>
            <tr>
              <td>일하다</td>
              <td>To Work</td>
            </tr>
            <tr>
              <td>주다</td>
              <td>To Give</td>
            </tr>
          </table>
          <button onClick={handleStart}>Start</button>
        </div>
      )}
      {started && !finished && (
        <div className='questions'>
          <div className='korean'>
            <TextToSpeechComponent text={verb}/>
          </div>
          <div className='english'>
            {boxes.map((box) => (
              <div
                key={box.id}
                className={`box ${box.status}`}
                onClick={() => checkAnswer(box)}
              >
                {box.content}
              </div>
            ))}
          </div>
          <div>
            {usedVerbs.length < 10 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleFinish}>Finish</button>
            )}
          </div>
        </div>
      )}
      {finished && (
        <div className='results-page'>
          <h1>Score: {correct}/10</h1>
          {incorrect.length > 0 &&
          <div>
          <h1>Incorrect: </h1>
          <h1>{incorrect.join(', ')}</h1>
          </div>}
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
