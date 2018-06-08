// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Speech SDK for Voice to Text and Text to Voice
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

(_=>{
'use strict';

function spoken() { }
if (typeof window !== 'undefined') window.spoken = spoken;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Setup Speech Regcognition
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const recognition = new webkitSpeechRecognition();

recognition.interimResults = true;
recognition.lang           = navigator.language || 'en-US';

spoken.recognition = recognition;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Get Voices for Text-to-Speech
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
spoken.voices = async e => {
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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Speech to Text - Listens to your voice and creates a transcription.
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
spoken.listen = async e => {
    recognition.onstart  = spoken.listen.startcb;
    recognition.onend    = spoken.listen.endcb;
    recognition.onerror  = spoken.listen.errorcb;
    recognition.onresult = spokenResults;

    return new Promise( ( resolve, reject ) => {
        try      { resolve(recognition.start()) }
        catch(e) { reject(e) }
    } );
};

function spokenResults(event) {
    const results = event.results;
    const interim = [];

    // Results
    for (let i=0;i<results.length;i++) {
        // Interim Result
        interim.push(results[i][0].transcript);

        // Final Result
        if (results[i].isFinal)
            resolve( results[i][0].transcript, event );
    }

    spoken.listen.partialcb( interim.join(''), event );
    interim.length = 0;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Stop Speech to Text Voice Recognition
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
spoken.listen.stop = async e => {
    spoken.recognition.stop();
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Speech to Text - Transcription Events
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
spoken.listen.on = {
    partial : cb => spoken.listen.partialcb = cb
,   start   : cb => spoken.listen.startcb   = cb
,   end     : cb => spoken.listen.endcb     = cb
,   error   : cb => spoken.listen.errorcb   = cb
};

spoken.listen.partialcb = e => true;
spoken.listen.startcb   = e => true;
spoken.listen.endcb     = e => true;
spoken.listen.errorcb   = e => true;


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
