# Server

## Om server

Dette er koden som kjører på serveren. Denne koden er skrevet i JavaScript og er delt opp i flere mapper/filer.

## config

For tilkobling av MongoDB database.

## controllers

Her håndteres det som har med brukere å gjøre, altså innlogging.

## middleware

Her er det en funksjon som sjekker om brukeren er logget inn, før en kan sende inn førespørseler til dashbordet.

## models

Her er det modeller for brukere og sensordata, som blir brukt for databasen.

## routes

Her er det ruter for innlogging og registrering av brukere. 

## utils

Her er det diverse funksjoner som blir brukt i komponentene, f.eks. funksjoner for tilkobling av MQTT.
