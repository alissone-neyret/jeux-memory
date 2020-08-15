$(document).ready(function () {

    // On définit notre tableau de fruit
    const listeFruits = [
        {
            reference: 1,
        },
        {
            reference: 2,
        },
        {
            reference: 3,
        },
        {
            reference: 4,
        },

    ]
    const tableauCartes = []

    // On crée un classe "Partie" qui va servir à contenir toutes les actions voulues qui concernent la partie de jeu
    class Partie {
        constructor() {
            this.nouvellePartie()
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
                $('#plateau_cartes').append(`<div id=${index} class="carte"><div class="carte-face-arriere"></div>
                <div class="carte-face-avant" style="background-position-y: ${carte.positionBackground}px"></div></div>`)
                
            })



            $(".carte").click(function (e) {
                console.log("click", e.currentTarget.id)
                $(`#${e.currentTarget.id}`).addClass('--animation-retournement-carte')
            })

        }

        melangeDesCartes(tableauCartes) {
            for (let i = tableauCartes.length - 1; i > 0; i--) {

                let indexAleatoire = Math.floor(Math.random() * i);
                let carteProvisoire = tableauCartes[i];
                tableauCartes[i] = tableauCartes[indexAleatoire];
                tableauCartes[indexAleatoire] = carteProvisoire;
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