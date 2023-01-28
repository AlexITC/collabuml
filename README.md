# Getting started

CollabUML is a PlantUML based app for online collaborative design on UML


## How it works?

CollabUML is a super-simple client only app that wires existing technology, in this case, it uses an https://etherpad.org to handle the collaborative text editor and https://plantuml.com/ public server to render the editor's content.

There is a timer that takes the etherpad content to render it with plantuml on every tick.


## Run it

An Etherpad instance is required, host/apikey must be configured at [config.js](./src/config.js)

Then, run `npm install` to download the js dependencies, then, `npm run start` will allow you to use the app at `localhost:8080`

## Project state

The project was created in 2020, there haven't been much changes since then, I plan to keep the server running for as long as it doesn't require much maintenance (the case for 3 years).
