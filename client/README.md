# Client

## Om Client

Koden som håndterer brukergrensesnittet i webapplikasjonen er lokalisert i client/src-mappen. Inne i denne mappen vil du finne flere undermapper: `components`, `configs`, `layouts`, `pages` og `utils`.

## components

I components-mappen finnes filer som inneholder kode for ulike komponenter, inkludert grafer, innloggings-/registreringsskjemaer og andre elementer. Disse komponentene fungerer som grunnleggende "byggeklosser" for nettsiden.

## configs

I configs-mappen finner du ulike konfigurasjonsfiler for komponenter som grafer. Her kan du for eksempel se detaljene i konfigurasjonen av hvordan grafene er satt opp.

## layout

Layout-mappen inneholder koden som utgjør "malen" for alle nettsidene, hvor både **headeren** og **footeren**, som er felles for alle sidene, er inkludert.

## pages

Pages-mappen inneholder koden som brukes på hver enkelt side. Her blir komponenter, som benyttes på sider som dashboardet, innkalt. For eksempel hentes grafkomponenter som (`SensorData`).

## utils

Innenfor utils-mappen finner du en rekke funksjoner som anvendes i ulike komponenter, slik som funksjoner for tilkobling til MQTT.
