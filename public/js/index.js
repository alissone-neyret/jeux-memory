// bouton reset, bouton start, modal à la fin du temps si pas gagné, enregistrement des données en bdd, affichage des scores

$(document).ready(function () {

    /* On définit notre tableau de fruit */
    const listeFruits = [{ reference: 1 }, { reference: 2 }, { reference: 3 }, { reference: 4, }, { reference: 5 }, { reference: 6 }, { reference: 7 }, { reference: 8 }, { reference: 9 }, { reference: 10 }, { reference: 11 }, { reference: 12 }, { reference: 13 }, { eference: 14 }, { reference: 15 }, { reference: 16 }, { eference: 17 }, { reference: 18 }];
    const tableauCartes = [];
    let cartesRetournees = [];
    const pairesTrouvees = [];
    let aGagne = false;
    let tempsPasse = 1;

    /* On crée un classe "Partie" qui va servir à contenir toutes les actions voulues qui concernent la partie de jeu */
    class Partie {
        constructor() {
            this.nouvellePartie()
            this.barreDeProgression()
        }

        // On démarre une partie
        // On gagne une partie
        // On perd une partie
        // Une partie est finie

        /* On crée un méthode qui va générer une nouvelle partie */
        nouvellePartie() {
            let id = 1
            let positionBackground = 0

            /* Pour chaque élément de notre tableau de fruit, nous allons créer une nouvelle carte et définir ses caractéristiques grâce à la classe "Carte" */
            $.each(listeFruits, function (index, fruit) {

                let nouvelleCarte = new Carte(fruit.nom, id, positionBackground)
                let nouvelleCarte2 = new Carte(fruit.nom, id, positionBackground)

                tableauCartes.push(nouvelleCarte)
                tableauCartes.push(nouvelleCarte2)
                id += 1
                positionBackground += -100

            })

            this.melangeDesCartes(tableauCartes)

            $.each(tableauCartes, function (index, carte) {

                $('#memory__plateau__cartes').append(`<div id=${index} class="carte"><div class="carte-face-arriere"></div>
                <div class="carte-face-avant" style="background-position-y: ${carte.positionBackground}px"></div></div>`)

            })

            /* A chaque fois que l'on clique sur une carte, on a besoin de savoir si elle peut être retournée (recto), si une paire a été trouvée ou si on doit la retourner (verso) */
            $(".carte").click(async (e) => {
                let carteCliquee = tableauCartes[e.currentTarget.id]

                if (pairesTrouvees.length > 0 && pairesTrouvees.indexOf(carteCliquee.id) !== -1) {
                    return false
                } else if (cartesRetournees.length === 0) {
                    $(`#${e.currentTarget.id}`).addClass('--animation-retournement-carte')
                    carteCliquee.idElement = parseInt(e.currentTarget.id)
                    cartesRetournees.push(carteCliquee)

                }
                else if (cartesRetournees.length === 1) {
                    $(`#${e.currentTarget.id}`).addClass('--animation-retournement-carte')
                    carteCliquee.idElement = parseInt(e.currentTarget.id)
                    cartesRetournees.push(carteCliquee)

                    this.compareCartesRetournees(cartesRetournees[0], cartesRetournees[1])

                }
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
                pairesTrouvees.push(premiereCarteRetournee.id)
                pairesTrouvees.push(deuxiemeCarteRetournee.id)
                cartesRetournees = []

                /* A chaque paire trouvée, on vérifie si la partie est terminée */            
                this.verifieSiPartieGagnee()

                /* Si les 2 cartes choisies ne sont pas une paire, on les retourne */
            } else {

                console.log("cartes retournées tableau", cartesRetournees)
                window.setTimeout(() => {
                    console.log("cartes retournées tableau", cartesRetournees)

                    console.log("je time out")
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
                aGagne = true;
                window.setTimeout(() => {
                    alert("C'est gagné")
                }, 700)
            }
        }

        barreDeProgression() {

            console.log("progression")
            let elem = document.getElementById("chrono");
            let width = 1;
            let id = setInterval(frame, 50);

            function frame() {

                let test;
                let test2;

                if (width >= 100 && !aGagne) {
                    test = new Date(tempsPasse * 1000).toISOString()
                    test2 = test.substring(11, 19)
                    alert('Perdu')
                    clearInterval(id);
                    tempsPasse = 0;
                    width = 0;
                    elem.style.width = width + '%';
                } else if (!aGagne) {
                    width++;
                    elem.style.width = width + '%';
                    tempsPasse += 1
                }
            }
        }
    }


    class Carte {
        constructor(nom, id, positionBackground) {
            this.id = id;
            this.nom = nom;
            this.positionBackground = positionBackground
        }
    }

    class Chronometre {
        constructor(duree) {
            this.duree = duree
        }
    }

    new Partie()
});