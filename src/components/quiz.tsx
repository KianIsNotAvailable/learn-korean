import React from 'react';
import Verbs from '../verbs';
import './quiz.css';
import Speaker from '../images/speaker.png';
import TextToSpeechComponent from '../TextToSpeechComponent';
type Props = {}

function Quiz({}: Props) {
  return (
    <div>
        <div className='korean'>
        <h1>{Verbs[2].Korean}</h1>
        <img src={Speaker}/>
        </div>
        <div className='english'>
        <h1 className='box'>English word</h1>
        <h1 className='box'>English Word</h1>
        <h1 className='box'>English Word</h1>
        <h1 className='box'>English Word</h1>
        </div>
        <TextToSpeechComponent />
    </div>
  )
}

export default Quiz