// TextToSpeechComponent.js
import React, { useState } from 'react';
import AWS from './aws-config';

const TextToSpeechComponent = (props) => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleTextToSpeech = async () => {
    const polly = new AWS.Polly();

    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: 'Seoyeon', // Specify the voice you want to use
    };

    try {
      const result = await polly.synthesizeSpeech(params).promise();
      setAudioUrl(URL.createObjectURL(new Blob([result.AudioStream])));
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  return (
    <div>
      <h1 text={props}></h1>
    </div>
  );
};

export default TextToSpeechComponent;
