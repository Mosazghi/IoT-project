# Server

## Om server

Koden som kjøres på serveren til webapplikasjonen er strukturert etter [Model-View-Controller-modellen](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) for å forenkle utviklingsprosessen. Serveren er utformet i JavaScript og oppdelt i flere filer.
De relevante mappene: `config`, `controllers`, `middleware`, `models`, `routes` og `utils`

## config

I config-mappen etableres serverens tilkobling til databasen, som er MongoDB.

## controllers

Her håndteres det som har med brukere å gjøre, altså innlogging. Alt fra verifisering av brukernavn og passord, til registrering av bruker.

## middleware

Her er det en funksjon som sjekker om brukeren er logget inn, før en kan sende inn førespørseler til dashbordet.

## models

Her er det modeller for brukere og sensordata, som blir brukt for databasen.

## routes

Her er det ruter for innlogging og registrering av brukere.

## utils

Her er det diverse funksjoner som blir brukt i komponentene, f.eks. funksjoner for tilkobling av MQTT.
