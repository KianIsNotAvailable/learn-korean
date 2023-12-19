// TextToSpeechComponent.js
import React, { useState } from 'react';
import AWS from './aws-config';

const TextToSpeechComponent = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleTextToSpeech = async () => {
    const polly = new AWS.Polly();

    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: 'Joanna', // Specify the voice you want to use
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
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleTextToSpeech}>Generate Audio</button>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default TextToSpeechComponent;
