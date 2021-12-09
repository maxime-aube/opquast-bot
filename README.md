# OpquastBot
Projet de bot Discord pédagogique pour la certification Opquast qualité web (non officiel).\
Dépôt pour le serveur Node.js + instructions d'installation.

## Configuration
- node v17.2.0+
- npm 8.1.4+

## Dépendances 
- discord.js (doc : https://discord.js.org/#/docs/main/stable/general/welcome)

## Installation

TL;DR 

Votre bot et votre serveur Node sont déjà créés ?\
-> Créez un fichier auth.json à la racine de votre serveur, au format `{"token": "<votre token>"}` pour connecter votre serveur avec le bot.

### Bot Discord

- Connectez-vous à l'application web Discord et rendez-vous dans la section developers (https://discord.com/developers)
- Créez une application
- Dans cette application créez un bot
- Dans la section OAuth2 de l'application, sous URL Generator, sélectionner le scope "bot" avec les permissions souhaitées pour le bot.
- copier le lien généré (type: https://discord.com/api/oauth2/authorize?client_id=912792079485247559&permissions=517611179072&scope=bot) dans votre navigateur et sélectionnez un serveur sur lequel ajouter le bot (valider les permissions).

### serveur NodeJS (local)

- Sur votre machine, assurez-vous de satisfaire la configuration minimale
- démarrez un nouveau projet Node avec votre éditeur ou en ligne de commande (run : `npn init`)
- installez le mode Discord (run : `npm i --save discord.js`)

Connecter le serveur au bot Discord avec le token :
- Récupérez le token de connexion du bot Discord dans l'application developers sous "Bot" > token > copy
- insérez ce token dans le fichier index.js dans la variable token

