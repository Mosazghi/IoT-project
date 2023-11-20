# IoT-prosjekt: gruppe 3 Gjøvik, 2023

## Info om prosjektet

Denne repositorium dekker IoT-prosjeket gitt i emnet IELEG2001 - Datakommuikasjon ved NTNU Gjøvik. Prosjektet som gruppa ble enige om går ut på å lage en webapplikasjon som skal kunne vise data fra en sensorer. Sensordata inkluderer blant annet strømforbruk, QR-koder, temperatur, CO2. Dette er for å kunne overvåke og analysere data ved en industribedrift.

Ovenfor vil du se flere forskjellige filer og mapper. Hovedkoden til prosjektet vil ligge i disse 3 mappene: ``client``, ``hardware`` og ``server``.

***I hver mappe vil du finne en ekstra ``README.md`` som forklarer (overordnet) programkoden i mer detalj.***

### client

Client mappen vil vise deg koden for nettsiden, dvs. frontenden-delen av nettsiden (klient-side), altså brukergrensenittet. React, Tailwind og Typescrip er det som blir brukt her.

### hardware

Denne mappen vil vise deg koden for mikrokontrollerne (ESP32), samt alle 3 modulene (**PIR-, QR- og sentralmodul**). Dette er skrevet i C++.

### server

Server mappen vil vise deg koden for backenden-delen av nettsiden(server-side), her vil du finne språket JavaScript. Express.js, MongoDB og Node.js er det som blir brukt her.
