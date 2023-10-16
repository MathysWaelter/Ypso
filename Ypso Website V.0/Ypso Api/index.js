const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Airtable = require('airtable');

// Initialize Airtable with your API key and base ID
const apiKey = 'patqNDUXO0OkJvY37.c1dbb73283a27821ac177330bcee2803b385f65ca1b52c3b248912a1e3c429df';
const baseId = 'app1ak5kCqsLBFHLU';
const base = new Airtable({ apiKey }).base(baseId);

// Select the table you want to insert data into
const tableName = 'Contact';
const table = base(tableName);

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({status: true, message: 'Bienvenue sur Ypso'});
});

app.post('/api/contact/create', (req, res) => {
   const { prenom, nom, email, message, userChoice } = req.body;
    console.log(req.body);
    return;

    
   table.create(req.body, (err, record) => {
    if (err) {
      console.error('Error creating record:', err);
      return res.send({status: false, message: 'Une erreur est survenue'})
    } else {
      console.log('Record created successfully');
      return res.send({status: true, message: 'Votre message avec succès'})
      console.log(record);
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
