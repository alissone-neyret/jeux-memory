import Carte from './Carte.js';
import { afficheHorlogeDepuisSecondes, recupereScores } from './fonctions.js';

/* On définit les variables dont on aura besoin dans notre partie */
const listeFruits = [
    { reference: 1 }, { reference: 2 }, { reference: 3 }, { reference: 4, }, { reference: 5 }, { reference: 6 }, { reference: 7 }, { reference: 8 }, { reference: 9 }, { reference: 10 }, { reference: 11 }, { reference: 12 }, { reference: 13 }, { eference: 14 }, { reference: 15 }, { reference: 16 }, { eference: 17 }, { reference: 18 }
];
let tableauCartes = [];
let cartesRetournees = [];
let pairesTrouvees = [];
let aGagne;
let tempsPasse = 0;


/* On crée un classe "Partie" qui va servir à contenir toutes les actions voulues qui concernent la partie de jeu */
export default class Partie {
    constructor() {
        this.nouvellePartie()
        this.barreDeProgression()
    }


    /* On crée un méthode qui va générer une nouvelle partie */
    nouvellePartie() {
        aGagne = false

        let id = 1
        let positionBackground = 0           

        /* Pour chaque élément de notre tableau de fruit, nous allons créer une nouvelle carte et définir ses caractéristiques grâce à la classe "Carte" */
        $.each(listeFruits, function (index, fruit) {

            let nouvelleCarte = new Carte(id, positionBackground)
            let nouvelleCarte2 = new Carte(id, positionBackground)

            tableauCartes.push(nouvelleCarte)
            tableauCartes.push(nouvelleCarte2)
            id += 1
            positionBackground += -100

        })

        this.melangeDesCartes(tableauCartes)

        $.each(tableauCartes, function (index, carte) {

            $('#memory__jeux__plateau__cartes').append(`<div id=${index} class="carte"><div class="carte-face-arriere"></div>
            <div class="carte-face-avant" style="background-position-y: ${carte.positionBackground}px"></div></div>`)

        })


        /* A chaque fois que l'on clique sur une carte, on a besoin de savoir si elle peut être retournée (recto), si une paire a été trouvée ou si on doit la retourner (verso) */
        $(".carte").click((e) => {
            let carteCliquee = tableauCartes[e.currentTarget.id]


            /* On bloque la possibilité de cliquer sur une carte dont la paire a été trouvée*/
            if (pairesTrouvees.length > 0 && pairesTrouvees.indexOf(carteCliquee.id) !== -1) {
                return false
            }
            /* Lors de la sélection de la première carte, on la retourne, on la stocke (avec l'id de son élément HTML) */
            else if (cartesRetournees.length === 0) {

                $(`#${e.currentTarget.id}`).addClass('--animation-retournement-carte')

                carteCliquee.idElement = parseInt(e.currentTarget.id)
                cartesRetournees.push(carteCliquee)
            }

            /* Lorsque la 2ème carte est sélectionnée, on la retourne, on la stocke (avec l'id de son élément HTML) et on compare les 2 cartes afin de déterminer s'il s'agit d'une paire*/
            else if (cartesRetournees.length === 1) {

                $(`#${e.currentTarget.id}`).addClass('--animation-retournement-carte')
                carteCliquee.idElement = parseInt(e.currentTarget.id)
                cartesRetournees.push(carteCliquee)

                this.compareCartesRetournees(cartesRetournees[0], cartesRetournees[1])

            }
            /* On bloque la possibilité de cliquer sur une 3ème carte*/
            else if (cartesRetournees.length > 1) {

                return false
            }

        })
    }


    /**
     * Permet de modifier les emplacements des cartes de façon aléatoire
     * @param {array} tableauCartes 
     */
    melangeDesCartes(tableauCartes) {

        for (let i = tableauCartes.length - 1; i > 0; i--) {

            /* On détermine un index aléatoire dans lequel on va stocker l'élément qui se trouve à l'emplacement "i" */
            let indexAleatoire = Math.floor(Math.random() * i);
            let carteProvisoire = tableauCartes[i];
            tableauCartes[i] = tableauCartes[indexAleatoire];
            tableauCartes[indexAleatoire] = carteProvisoire;
        }
    }


    /**
     * Permet de comparer les 2 cartes qui viennent d'être choisies pour vérifier s'il s'agit d'une paire.          
     * @param {object} premiereCarteRetournee 
     * @param {object} deuxiemeCarteRetournee 
     */
    compareCartesRetournees(premiereCarteRetournee, deuxiemeCarteRetournee) {

        /* Grâce à l'id des cartes, on peut vérifier si les 2 cartes choisies sont des paires */
        if (premiereCarteRetournee.id === deuxiemeCarteRetournee.id) {
            console.log("paires")
            pairesTrouvees.push(premiereCarteRetournee.id)
            pairesTrouvees.push(deuxiemeCarteRetournee.id)
            cartesRetournees = []

            this.verifieSiPartieGagnee()
        }
        /* Si les 2 cartes choisies ne sont pas une paire, on les retourne (verso) en utilisant l'id de l'élément HTML */
        else {

            window.setTimeout(() => {
                $(`#${premiereCarteRetournee.idElement}`).removeClass('--animation-retournement-carte')
                $(`#${deuxiemeCarteRetournee.idElement}`).removeClass('--animation-retournement-carte')
                cartesRetournees = []
            }, 700)

        }
    }


    /**
     * Permet de vérifier si la partie est terminée et gagnée en comparant le tableau des cartes et le tableau des paires trouvées
     */
    verifieSiPartieGagnee() {

        if (pairesTrouvees.length === tableauCartes.length) {
            console.log("on passe a gagné à true")
            aGagne = true;
        }
    }


    /**
     * Permet de générer une barre de progression, d'afficher un chronomètre et vérifie si la partie est finie.
     */
    barreDeProgression() {
        let element = document.getElementById("chrono");
        let width = 100;
        let interval = setInterval(actionsAEffectuees, 1000);
        let self = this      
        let tempsEcoule = afficheHorlogeDepuisSecondes(tempsPasse)
        $('.memory__jeux__temps-affichage').text(tempsEcoule)  

        function actionsAEffectuees() {

            if (aGagne === true) {
                self.finDePartie(element, width, interval)

            } else if (width === 0 && !aGagne) {
                self.finDePartie(element, width, interval)

            } else if (aGagne !== true) {
                width -= 0.5;
                element.style.width = width + '%';
                tempsPasse += 1
                let tempsEcoule = afficheHorlogeDepuisSecondes(tempsPasse)
                $('.memory__jeux__temps-affichage').text(tempsEcoule)
            }
        }
    }


    /**
     * Permet de faire un appel API afin d'enregistrer en base de données le score
     */
    enregistreTemps() {
        let valeurASauvegarder;

        if (aGagne === true) {
            valeurASauvegarder = {
                duree: tempsPasse,
                aGagne: 1
            }
        }
        else {
            valeurASauvegarder = {
                duree: tempsPasse,
                aGagne: 0
            }
        }

        axios.post('/sauvegarde/score', valeurASauvegarder)
    }


    /**
     * Permet de réinitaliser les valeurs des différents tableaux et des variables utilisées
     */
    reinitialiseValeurs() {
        tableauCartes = [];
        cartesRetournees = [];
        pairesTrouvees = [];
        tempsPasse = 1;        
    }


    /**
     * Permet d'adapter les comportements voulus lorsqu'un partie est terminée ou non.
     * @param {number} element 
     * @param {number} width 
     * @param {number} interval 
     */
    finDePartie(element, width, interval) {

        this.enregistreTemps()
        recupereScores()
        clearInterval(interval);
        tempsPasse = 0;
        width = 0;
        element.style.width = width + '%';
        this.reinitialiseValeurs()
        $('.memory__jeux').hide()
        $('.memory__accueil').show()
        $('.memory_fin-partie').show()
        $('.carte').remove()
        $('.memory__accueil-bouton').html('Rejouer')

        /* On adapte le message de l'alerte et du titre de fin de partie selon que la partie ait été gagnée ou perdue */
        if (aGagne === true) {
            alert('Vous avez trouvé toutes les paires !')
            $('.memory__fin-partie-titre').text('Félicitation, vous avez trouvé toutes les paires de fruits ! Essayez d\'améliorer votre score !')
        }
        else {
            alert('Aïe Aïe Aïe, le temps est écoulé !')
            $('.memory__fin-partie-titre').text('Dommage, vous n\'avez pas trouvé toutes les paires dans le temps imparti. Réessayez !')
        }
    }


}