// TextToSpeechComponent.js

import React from 'react';
import AWS from 'aws-sdk';
import Speaker from './images/speaker.png'

AWS.config.update({
  accessKeyId: REACT_APP_ACCESS_KEY,
  secretAccessKey: REACT_APP_SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});

const Polly = new AWS.Polly();

const TextToSpeechComponent = ({ text }) => {
  const synthesizeSpeech = async () => {
    try {
      const params = {
        OutputFormat: 'mp3',
        Text: text,
        TextType: 'text',
        VoiceId: 'Seoyeon',
        LanguageCode: 'ko-KR',
      };

      const data = await Polly.synthesizeSpeech(params).promise();
      const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create an Audio element and play it
      const audio = new Audio(audioUrl);
      audio.play().catch((error) => console.error('Error playing audio:', error));
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  return (
    <div onClick={synthesizeSpeech} className='tts'>
      <h1>{text}</h1>
      <img src={Speaker}  alt='Speaker Icon' />
    </div>
  );
};

export default TextToSpeechComponent;
