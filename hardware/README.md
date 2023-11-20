# Hardware

## Om hardware

Hardwaremappen består av 3 hovedmapper:

- ``PIRModul``
- ``QRSkannerModul``
- ``SentralModul``

Merk at inni hvert av disse mappene, vil du finne en tom `.ino`-fil, dette er for multifilsprogram. Dette er for å gjøre det enklere å holde orden på koden.

## PIR MODUL

I PIR modul vil du finnne koden som om handler en passive infrarød sensor og ESPNOW kode. Det er denne koden som gjør at vi kan sende data fra PIR sensoren til sentral modulen for å skru på lyset.

## QR Skanner Modul

I denne mappen så vil du finne kode for sending av data fra QR skanneren til MQTT. Du vil også finne kode for å koble til WiFi og hvordan vi kobler til MQTT.

## Sentral Modul

Dette er delen som tar for seg alle sensorenens målinger. I likehet med QR-modul, vil kunne du finne filer som omhandler tilkobling mellom enhetene og MQTT, samt WiFi. I tillegg hovrdan sensordata blir sendt til MQTT ved bruk av spesielle funksjoner som er laget for dette prosjektet (`sendJson(...)`).
