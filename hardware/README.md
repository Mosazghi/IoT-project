# Hardware

## Om hardware

Hardwaremappen består av 3 hovedmapper:

- `PIRModul`
- `QRSkannerModul`
- `SentralModul`

Merk at inni hvert av disse mappene, vil du finne en tom `.ino`-fil, dette er for multifilsprogram. Dette er for å gjøre det enklere å holde orden på koden.

## PIR MODUL

Innenfor PIR-modulen finner du koden relatert til en passiv infrarød sensor og ESPNOW. Denne koden muliggjør overføring av data fra PIR-sensoren til den sentrale modulen, som aktiverer lyset.

## QR Skanner Modul

I QR-modulen finner du koden som håndterer overføring av data fra QR-skanneren til MQTT. Denne delen inneholder også kode for tilkobling til Wi-Fi og MQTT.

## Sentral Modul

I denne delen blir det lagt fokus på håndtering av sensoravlesninger. Likt som i QR-modulen, er det her inkludert filer som behandler tilkoblingen mellom enhetene og MQTT, samt Wi-Fi-tilkoblinger. Det demonstreres også hvordan dataene blir behandlet ved edge computing før de sendes videre via MQTT.
