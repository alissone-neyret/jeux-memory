# Memory O'Clock

### :bookmark: Sommaire

* Règles
* Technologies utilisées
* Installation


## :clipboard: Règles

Le jeux Memory est un jeux de mémoire où vous devez retrouver toutes les paires de cartes dans un temps imparti. 

A l'arrivée, il y a un plateau de 36 cartes face cachée. Vous devez retourner les cartes 2 par 2. Si les cartes retournées sont identiques alors vous gagnez la paire, sinon les cartes sont automatiquement retournées et cachées. A nouveau vous devez retourner 2 nouvelles cartes.

La partie est terminée lorsque toutes les paires ont été trouvées avant la fin du temps ou lorsque le temps est écoulé.

Chaque score réalisé est sauvegardé en base de données et les 10 meilleurs apparaissent à l'arrivée.

## :wrench: Technologies utilisées

HTML / CSS / JS / NODEJS

La librairie JQuery a été utilisée pour faciliter la gestion d'événements et les modifications du DOM.

Un préprocesseur CSS a été utilisé pour générer dynamiquement un fichier CSS. Il permet d’améliorer l’écriture des fichiers CSS en apportant plus de flexibilité.


## :floppy_disk: Installation du jeux

Pré-requis :

* NodeJS
* MySQL

#### Etape 1 : Cloner le projet :two_women_holding_hands:

Depuis un terminal, placez-vous dans le dossier où vous souhaitez enregistrer le projet puis clonez-le :

```
cd "dossierOuStockerLeProjet"
git clone "https://github.com/..."
```

#### Etape 2 : Création de la base de données :scroll:

Afin de pouvoir stocker les scores, il faut créer une base de données. Vous pouvez créer une base de données depuis MySQL avec cette commande : 

> :warning: Il est impératif que votre base de données s'appelle "memory"

```
CREATE DATABASE memory
```

#### Etape 2 : Configuration :gear:

Votre base de données maintenant créée, il faut modifier les informations de connexion à celle-ci. 
Pour cela, rendez-vous dans le fichier config.js et modifiez les identifiants de connexion afin de renseigner ceux que vous utilisez pour vous connecter à MySql.

#### Etape 3 : NPM :cd:

Il est maintenant temps d'installer les paquets nécessaires à la bonne exécution du jeux. Placez-vous dans le dossier du jeux puis exécutez la commande suivante : 

```
npm install
```

#### Etape 4 : Lancement du jeux :rocket:

Félicitations vous avez réussi toutes les étapes précédentes ! Il est maintenant l'heure de s'amuser ! 
Une dernière commande à lancer et c'est à vous de jouer : 

```
node app.js
```

Vous pouvez maintenant ouvrir une page de votre navigateur internet préféré et vous rendre à l'url : [localHost:3000](http://localhost:3000).

Enjoy ! :tada:
