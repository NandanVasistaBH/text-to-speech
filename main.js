const synth=window.speechSynthesis;
// above line API call madthide
const body=document.querySelector('body')
const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');

let voices=[];

const getVoices=() =>{
  voices=synth.getVoices();
  // loop through voices and creat an option for each one 
  voices.forEach(voice => {
    // creating option element using DOM
    const option=document.createElement('option');
    // Fill option with voice and language
    option.textContent=voice.name+'{'+voice.lang+'}';
    // Set needed option attributes
    option.setAttribute('data-lang',voice.lang);
    option.setAttribute('data-name',voice.name);
    voiceSelect.appendChild(option);
  });

};
getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged=getVoices;
}
// speak

const speak=()=>{
  // check if speaking
  if(synth.speaking){
    console.error('already speaking...');
    return
  }
  if(textInput.value !== ''){
      // animation
      body.style.background='#141414 url(img/wave.gif)';
      body.style.backgroundRepeat='repeat-x';
      body.style.backgroundSize='100% 100%';
      //get speak text
      const speakText=new SpeechSynthesisUtterance(textInput.value);
      //speak end
      speakText.onend= e =>{
        console.log('done speaking....');
        body.style.background='#141414';
      }
      // speak error
      speakText.onerror= e =>{
        console.error('something is wrong');
      }
      // selected voice
      const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');
      // loop through voices
      voices.forEach(voice=>{
        if(voice.name===selectedVoice){
          speakText.voice=voice;
        }
      });
      // set pitch and rate
      speakText.rate=rate.value;
      speakText.value=pitch.value;
      // speak
      synth.speak(speakText);
  }
};
// eventListeners

// text form submit

textForm.addEventListener('submit',e=>{
  e.preventDefault();
  speak();
  textInput.blur();
});
// rate value change
rate.addEventListener('change', e =>(rate.Value.textContent=rate.value));
pitch.addEventListener('change', e =>(pitch.Value.textContent=pitch.value));
// voice select change
voiceSelect.addEventListener('change',e =>speak());