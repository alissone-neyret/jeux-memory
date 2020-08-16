const express = require('express');
const connection = require('./config');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', router);

router.get('/scores', (req, res) => {  

  connection.query('SELECT * from score where aGagne = 1', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un score");
    } else {
      let tableauScores = JSON.parse(JSON.stringify(results));
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.json(tableauScores);
    }
  });
});

router.post('/sauvegarde/score', (req, res) => {
  const donnees = req.body

  connection.query('INSERT INTO score SET ?', donnees, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un score");
    } else {
      console.log("bien envoyé!")
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
