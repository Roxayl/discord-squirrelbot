SquirrelBot
===========================

SquirrelBot est un bot pour [Discord](https://discord.com/) permettant d'apporter de 
nouvelles fonctionnalités adaptées à la communauté de Génération City.

Liens utiles : [Lien d'invitation Discord](https://discord.gg/4P3HqVbbgR) - 
[Le forum de la communauté](https://www.forum-gc.com/)

## Sommaire

- [SquirrelBot](#squirrelbot)
  - [Sommaire](#sommaire)
  - [Installation](#installation)
    - [Environnement d'exécution](#environnement-dexécution)
    - [Interaction avec l'API Discord](#interaction-avec-lapi-discord)
    - [Étapes d'installation via Docker](#étapes-dinstallation-via-docker)
  - [Développement et tests](#développement-et-tests)
  - [Structure de l'application](#structure-de-lapplication)
    - [Commandes](#commandes)

## Installation

Les sources sont fournies avec des instructions permettant d'exécuter l'application 
de manière conteneurisée via Docker.

### Environnement d'exécution

SquirrelBot repose sur deux services fournis en tant qu'images Docker.

L'application serveur est développée en JavaScript basée sur l'environnement
d'exécution de Node.js (version 16). L'application utilise en particulier
[discord.js](https://discord.js.org/) (version 13) pour interagir avec l'API Discord, 
et l'ORM [Sequelize](https://sequelize.org/) (version 6) pour interagir avec la base 
de données. Par ailleurs, SquirrelBot fournit par ailleurs un service Web reposant 
sur [Express](https://expressjs.com/fr/) (version 4).

Le stockage des données est effectuée grâce au système de gestion de 
base de données [MySQL](https://www.mysql.com/fr/) (version 8).

### Interaction avec l'API Discord

Avant d'utiliser le bot, il convient de générer un certain nombre de secrets via 
les outils pour les développeurs fournis par Discord.

Pour cela, dans la 
[page dédiée aux développeurs Discord](https://discord.com/developers/applications), 
créez une nouvelle application.

Vous devez ensuite récupérer **l'identifiant de l'application** (client_id),
**l'identifiant du serveur** où s'exécute le bot (guild_id), et le **jeton
d'authentification** (token). Les étapes de création d'un bot vous permettant de 
récupérer ces informations sont décrites dans le tutoriel suivant : 
[writebots.com/discord-bot-token/](https://www.writebots.com/discord-bot-token/).

### Étapes d'installation via Docker

Une fois les informations ci-dessus récupérées, vous êtes fin prêts à lancer votre
instance de l'application !

1. Dans le répertoire de l'application, créez le fichier  ``.env`` à partir de
   ``.env.example``, et remplissez les champs ``BOT_CLIENT_ID``, ``BOT_GUILD_ID``,
   et ``BOT_TOKEN`` avec les informations récupérées précédemment. Vous pouvez 
   également spécifier l'environnement d'exécution du bot à travers le paramètre
   ``NODE_ENV`` (qui prend les valeurs *development*, *testing*, ou *production*).

    > **NB :** Vous ne deviez pas avoir à modifier les informations de connexion
      à la base de données.

2. Dans le répertoire de l'application, exécuter la commande suivante pour créer
   les conteneurs de l'application :
   ```bash
   > docker-compose up -d
   ```

3. Il faut ensuite installer les dépendances de l'application, à partir du conteneur
   de l'application. Pour cela, exécuter les commandes suivantes :
   ```bash
   > docker exec -ti squirrelbot_bot /bin/bash
   > npm install
   ```

4. Ensuite, il faut créer et initialiser la base de données. Pour cela, accédez au 
   conteneur de l'application et exécutez les migrations. Vous pouvez ensuite sortir
   du conteneur de l'application avec la commande ``exit``.
   ```bash
   > npx sequelize-cli db:migrate
   > exit
   ```

5. Voilà ! Vous devriez voir votre bot s'exécuter sur le serveur spécifié, dans la 
   liste des membres. À partir d'un salon textuel accessible au bot, vous pouvez 
   vérifier que le bot répond bien aux commandes que vous exécutez, en tapant 
   ``/ping`` dans la fenêtre de chat.

## Développement et tests

L'application utilise le gestionnaire de dépendances de Node 
([NPM](https://www.npmjs.com/)) afin de gérer ses librairies externes. Vous pouvez 
mettre à jour les dépendances à partir du conteneur de l'application, à partir de 
la commande ``npm update``.

[ESLint](https://eslint.org/) fournit des outils d'[analyse statique](https://fr.wikipedia.org/wiki/Analyse_statique_de_programmes) 
afin de détecter des erreurs de programmation et mettre en forme le code source 
suivant la convention [Standard](https://standardjs.com/). Vous pouvez exécuter 
l'analyse de code à partir du conteneur de l'application, avec la commande suivante ;

```bash
> npx eslint . --ext .js
```

ESLint peut réparer automatiquement certaines erreurs dans le code. Pour cela, vous 
pouvez ajouter l'option ``--fix`` à la commande ci-dessus.

```bash
> npx eslint . --ext .js --fix
```

## Structure de l'application

### Commandes

SquirrelBot ajoute des 
[commandes slash](https://support.discord.com/hc/fr/articles/1500000368501-Slash-Commands-FAQ)
aux serveurs Discord sur lesquels il est installé. Le tableau ci-dessous récapitule
l'ensemble des commandes existantes.

| Commande             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| ``/ping``            | Exécute une simple commande renvoyant une réponse aléatoire. |
| ``/registerforum``   | Permet de lier un compte du forum au bot Discord, et d'octroyer à l'utilisateur de la commande le rang Forum GC. |

Les commandes sont chargées à partir du répertoire **/bot/commands**. Pour créer une 
nouvelle commande, il faudra créer un nouveau fichier dont le nom correspond au nom
de la commande.
