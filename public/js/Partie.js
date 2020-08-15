const cartes = [
    {
        id: 1,
        nom: "Pomme",
    },
    {
        id: 1,
        nom: "Pomme",
    },
    {
        id: 2,
        nom: "Banane",
    },
    {
        id: 2,
        nom: "Banane",
    },

]

export default class Partie {
    constructor() {
        this.nouvellePartie()
    }

    nouvellePartie() {
        $.each(cartes, function (index, value) {
            $('.plateau-cartes').append(index + ":" + value + '<br>')
        })
    }

}