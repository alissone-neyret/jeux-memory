/**
 * Permet de récupérer une horloge en format (hh:mm:ss) depuis une durée en secondes
 * @param {*number} duree La durée en secondes
 */
const afficheHorlogeDepuisSecondes = (duree) => {
    return new Date(duree * 1000).toISOString().substring(11, 19)
}

/**
 * Permet de récupérer les scores, de les trier pour ne garder que les scores gagnants et de les afficher
 */
const recupereScores = () => {

    let tableauScores = [];
    axios.get('/scores')
        .then((res) => {
            tableauScores = res.data
            tableauScores = tableauScores.sort(function (a, b) {
                return a.duree - b.duree
            })
            tableauScores.splice(3, tableauScores.length - 3)

            $.each(tableauScores, function (index, score) {
                let tempsEcoule = afficheHorlogeDepuisSecondes(score.duree)

                $('.memory__accueil__classement__scores').append(`<div id=${index} class="memory__accueil__classement__scores__temps">${tempsEcoule}</div>`)
            })
        })

}

export { afficheHorlogeDepuisSecondes, recupereScores };