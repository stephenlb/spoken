# JavaScript Text-to-Speech and Speech-to-Text for AI Artificial Intelligence Apps

# ⚠️  UNDER CONSTRUCTION ⚠️

> `npm i spoken` # https://www.npmjs.com/package/spoken

### Turn Speech into Text and Text into Speech

Compatible on Android / iOS / Linux / Windows / MacOS.

**Spoken** is a Google Chrome Voice App SDK.
This SDK allows you to easily call Voice APIs to turn Text to Speech and Speech to Text.
The library has no dependencies.
This SDK is only for Google Chrome apps on Mobile and Web.

Compatible with Electron (desktop), Ionic, PhoneGap/Cordova, React, Angular, etc.
This works on Mobile Chrome.

Currently there is support for Google Chrome.
And if you are looking to deploy as a mobile app, this **should work** 👌.

### Text-to-Speech

Synthetic voices are pretty good these days.
You can still tell they are robot voices.

Turn text into real-world spoken voice.
The voice is synthetic.
You can pick from a few different voices too.

```javascript
// Hello World
spoken.say('Hello World.');

// Say a quick message as Guy Fieri
spoken.say( 'Looks like your on a trip to flavor town.', 'Daniel' );

// Speak with Damayanti's voice
spoken.say( 'I am princess of the Vidarbha Kingdom.', 'Damayanti' );
```

#### Promises and Async/Await

This SDK Supports modern async programming.

```javascript
// Promise
spoken.say('Hello World.').then( v => console.log('Done talking.') );

// Async/Await
await spoken.say('Hello World.');
console.log('Done talking.');
```

### Text-to-Speech Voice Library

```javascript
// List of voices supported on platform
console.log( await spoken.voices() );

// List of voices with promise callback
spoken.voices().then( voices => console.log(voices) );
```

Get list of **English** voices.

```javascript
// List English Speaking Voices
(await spoken.voices()).filter( v => v.lang.indexOf('en') == 0 );
```

Sample the list of English voices.

```javascript
// Speak with each English voice to sample your favorites
(await spoken.voices())
    .filter( voice => voice.lang.indexOf('en') == 0 )
    .map( voice => voice.name )
    .forEach( voice =>
        spoken.say( 'Welcome to flavor town.', voice ).then(
            speech => console.log(speech.voice.name)
        )
    );
```

### Speech-to-Text

Turn your spoken words into text using the `listen()` method.
You will want to also take advantage of the real-time speech
detection using the `spoken.listen.on.partial()` event.
This allows you to display the current transcription before
your utterance is finished.

The following will allow you to capture the final transcription
which can be used to send over to a chatbot API.

```javascript
// Async/Await
console.log(await spoken.listen());

// or Promise style
spoken.listen().then( transcript => console.log(transcript) );
```

Capture live "real-time" transcription as you speak.

```javascript
spoken.listen.on.partial( transcript => { console.log(transcript) } );
```

Additional voice transcription events.

```javascript
spoken.listen.on.start( voice => { console.log('Started Listening') } );
spoken.listen.on.end(   voice => { console.log('Ended Listening')   } );
spoken.listen.on.error( voice => { console.log('Error Listening')   } );
```

Stop listening.

```javascript
spoken.listen.stop();
```
