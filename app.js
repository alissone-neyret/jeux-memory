const express = require('express');
const connection = require('./config');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;

/* Affichage du fichier HTML sur l'url "/" */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', router);

/* Création d'une route permettant de récupérer tous les scores */
router.get('/scores', (req, res) => {  

  /* On récupère tous les scores qui correspondent à des parties gagnées*/
  connection.query('SELECT * from score where aGagne = 1', (err, results) => {

    if (err) {
      /* Si une erreur est survenue lors de la récupération, alors on informe l'utilisateur de l'erreur */
      res.status(500).send("Erreur lors de la sauvegarde d'un score");
    } 
    else {
      /* Si tout s'est bien passé, on envoie les données récupérées */
      let tableauScores = JSON.parse(JSON.stringify(results));
      res.json(tableauScores);
    }
  });
});

/* Création d'une route permettant d'enregistrer un score */
router.post('/sauvegarde/score', (req, res) => {
  const donnees = req.body

  /* On enregistre un score dans la table "Score" */
  connection.query('INSERT INTO score SET ?', donnees, (err, results) => {

    if (err) {
      /* Si une erreur est survenue, alors on informe l'utilisateur de l'erreur */
      res.status(500).send("Erreur lors de la sauvegarde d'un score");
    } 
    else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
