import { recupereScores } from "./fonctions.js";
import Partie from './Partie.js';

$(document).ready(function () {

    $('.memory__jeux').hide()

    recupereScores()

    $(".memory__accueil-bouton").click(() => {
        $('.memory__accueil').hide()
        $('.memory__jeux').show()
        $('.memory__fin-partie-titre').text('')
        $('.memory__accueil__classement__scores__temps').remove()
        new Partie()
    })

});
