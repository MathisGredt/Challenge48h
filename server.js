const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const enigme1Router = require('./routes/enigme1.route');
const enigme2Router = require('./routes/enigme2.route');
const enigme3Router = require('./routes/enigme3.route');
const homeRouter = require('./routes/home.route')
const exp = require('constants');

app.use('/enigme1', enigme1Router);
app.use('/enigme2', enigme2Router);
app.use('/enigme3', enigme3Router);
app.use('/home', homeRouter);

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
