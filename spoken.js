(_=>{

'use strict';

function spoken() { }
if (typeof window !== 'undefined') window.spoken = spoken;

const recognition = new webkitSpeechRecognition();
const interim     = [];

// Setup Speech Regcognition
recognition.interimResults = true;
recognition.lang           = navigator.language || 'en-US';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Speech to Text - Listens to your voice and creates a transcription.
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
spoken.listen = async (resolve) => {
    resolve("words...");
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Get Voices for Text-to-Speech
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
spoken.voices = voices => {
    return new Promise( r => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) r(voices);
        speechSynthesis.onvoiceschanged = e => r(speechSynthesis.getVoices());
    } );
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Invoike Synthetic Voices for Text-to-Speech
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
spoken.say = async ( text, voice='Alex' ) => {
    const speech = new SpeechSynthesisUtterance(text);
    const voices = await spoken.voices();

    // Select Voice with Default
    speech.voice = (voices.filter( v => v.name == voice ) || voices)[0];

    return new Promise( resolve => {
        speech.onend = async () => resolve(speech);
        speechSynthesis.speak(speech);
    } );
};

/*

voice.stopped     = false;
voice.recognition = recognition;

voice.speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
};

voice.stop   = () => { voice.stopped = true; recognition.stop(); };
voice.start  = () => { voice.stopped = false; }
voice.listen = () => {
    if (voice.stopped) return;
    if (speechSynthesis.speaking) {
        return setTimeout( voice.listen, 100 );
    }

    voice.onInterim   = voice.onInterim || (()=>{});
    voice.onFinal     = voice.onFinal   || (()=>{});
    voice.onStart     = voice.onStart   || (()=>{});
    voice.onEnd       = voice.onEnd     || (()=>{});
    voice.onError     = voice.onError   || (()=>{});
    voice.noMatch     = voice.noMatch   || (()=>{});
    voice.finalResult = '';

    recognition.onstart  = voice.onStart;
    recognition.onend    = voice.onEnd;
    recognition.onerror  = voice.onError;
    recognition.nomatch  = voice.noMatch;
    recognition.onresult = results;

    try { recognition.start() }
    catch(e) {}
};


function results(event) {
    const results = event.results;

    // Results
    for (let i=0;i<results.length;i++) {
        // Interim Result
        interim.push(results[i][0].transcript);

        // Final Result
        if (results[i].isFinal) {
            voice.finalResult = results[i][0].transcript;
            voice.onFinal( results[i][0].transcript, event );
        }
    }

    voice.onInterim( interim.join(''), event );
    interim.length = 0;
}
*/

})();
