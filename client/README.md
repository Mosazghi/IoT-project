# Client

## Om Client

Koden som er relatert til webapplikasjon er i client/src mappen. Inni mappen så vil du finnne undermapper: ``components``, ``configs``, ``layouts``, ``pages`` og ``utils``.

## components

I components vil du finne filer som innholder koden til komponenter som grafer, login/signup form og mye mer. Dette er det som er "byggeklossene" til nettsiden, noe som React er god på.

## configs

I configs er diverse konfigurasjonsfil for komponenter som grafer, der vil du f.eks. se hvordan grafene er konfigurert.

## layout

Viser koden for "malen" for alle sidene, her er det header og footer som er felles for alle sidene.

## pages

Dette viser all koden som kommer inn på hver side. Her kaller vi på komponenter som vi bruker på f.eks dashboard siden, så kaller vi på grafer (`SensorData`).

## utils

Her er det diverse funksjoner som blir brukt i komponentene, f.eks. funksjoner for tilkobling av MQTT.
