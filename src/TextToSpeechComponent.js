// TextToSpeechComponent.js


import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});

const Polly = new AWS.Polly();

export const synthesizeSpeech = async (text) => {
  const params = {
    OutputFormat: 'mp3',
    Text: text,
    TextType: 'text',
    VoiceId: 'Seoyeon', 
    LanguageCode: 'ko-KR', 
  };

  try {
    const data = await Polly.synthesizeSpeech(params).promise();
    const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
};
