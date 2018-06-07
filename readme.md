# Spoken - JavaScript Text-to-Speech and Speech-to-Text for AI Artificial Intelligence Apps

#### Turn Speech into Text and Text into Speech

Compatible on Android / iOS / Linux / Windows / MacOS.

**Spoken** is a Google Chrome Voice Apps SDK.
This SDK allows you to easily call Voice APIs to turn Text to Speech and Speech to Text.
The library has no dependencies.
This SDK is only for Google Chrome apps on Mobile and Web.

Compatible with Electron (desktop), Ionic, PhoneGap, React and Angular.
This also works on Mobile Chrome.

Currently there is only support for Google Chrome.
And if you are looking to deploy native apps, this **will work**.

### Text to Speech

Turn text into real-world spoken voice.
The voice is synthetic.
You can pick from a few different voices too.

```javascript
// Hello World
spoken.say('Hello World.');

// Speak with Damayanti's voice
spoken.say( 'Hello, I am princess of the Vidarbha Kingdom.', 'Damayanti' );

// Looks like your on a trip to flavor town.
spoken.say( 'Hello, my name is Guy Fieri.', 'Luca' );
```

### Speech to Text


```javascript
spoken.listen( transcript => { console.log(transcript) });

spoken.listen.on.partial( transcript => { console.log(transcript) } );

spoken.listen.on.start( voice => { console.log('Started Listening') } );
spoken.listen.on.end(   voice => { console.log('Ended Listening')   } );
spoken.listen.on.error( voice => { console.log('Error Listening')   } );

```
