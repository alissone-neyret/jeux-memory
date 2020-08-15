$(document).ready(function () {

    // On définit notre tableau de fruit
    const listeFruits = [{ reference: 1 }, { reference: 2 }, { reference: 3 }, { reference: 4, }, { reference: 5 }, { reference: 6 }, { reference: 7 }, { reference: 8 }, { reference: 9 }, { reference: 10 }, { reference: 11 }, { reference: 12 }, { reference: 13 }, { eference: 14 }, { reference: 15 }, { reference: 16 }, { eference: 17 }, { reference: 18 }];
    const tableauCartes = [];
    let cartesRetournees = [];
    const pairesTrouvees = [];

    // On crée un classe "Partie" qui va servir à contenir toutes les actions voulues qui concernent la partie de jeu
    class Partie {
        constructor() {
            this.nouvellePartie()
            this.barreDeProgression()
        }

        // On démarre une partie
        // On gagne une partie
        // On perd une partie
        // Une partie est finie

        // On crée un méthode qui va générer une nouvelle partie
        nouvellePartie() {
            let id = 1
            let positionBackground = 0

            // Pour chaque élément de notre tableau de fruit, nous allons créer une nouvelle carte et définir ses caractéristiques grâce à la classe "Carte"
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

                console.log("carte", carte)
                console.log("index", index)
                $('#memory__plateau__cartes').append(`<div id=${index} class="carte"><div class="carte-face-arriere"></div>
                <div class="carte-face-avant" style="background-position-y: ${carte.positionBackground}px"></div></div>`)

            })


            $(".carte").click(async (e) => {
                let carteCliquee = tableauCartes[e.currentTarget.id]

                console.log("carte cliquée", carteCliquee)
                console.log("carte paires trouvees", pairesTrouvees.indexOf(carteCliquee.id))
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

                    if (cartesRetournees[0].id === cartesRetournees[1].id) {
                        console.log("une paire de trouvée !")
                        pairesTrouvees.push(cartesRetournees[0].id)
                        pairesTrouvees.push(cartesRetournees[1].id)
                        cartesRetournees = []

                        if (tableauCartes.length === 0) {
                            console.log("gagné!!")
                            window.setTimeout(() => {
                                alert("C'est gagné")
                            }, 700)
                        }

                    } else {

                        console.log("cartes retournées tableau", cartesRetournees)
                        window.setTimeout(() => {
                            console.log("cartes retournées tableau", cartesRetournees)

                            console.log("je time out")
                            $(`#${cartesRetournees[0].idElement}`).removeClass('--animation-retournement-carte')
                            $(`#${cartesRetournees[1].idElement}`).removeClass('--animation-retournement-carte')
                            cartesRetournees = []


                        }, 700)

                    }

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

        compareCartesRetournees(carte) {

            cartesRetournees.push(carte)
            console.log("carte retournées tableau", cartesRetournees)
            if (cartesRetournees.length === 2) {
                console.log("carte retournée 1", cartesRetournees[0].id)
                console.log("carte retournée 2", cartesRetournees[1].id)
                let unePaireTrouvee = cartesRetournees[0].id === cartesRetournees[1].id
                if (unePaireTrouvee) {
                    console.log("une paire de trouvée !")
                    pairesTrouvees.push(cartesRetournees[0].id)
                }
            }
        }

        barreDeProgression() {

            console.log("progression")
            let elem = document.getElementById("chrono");
            let width = 1;
            let id = setInterval(frame, 1000);

            console.log("elem", elem)
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++;
                    elem.style.width = width + '%';
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

    new Partie()
});