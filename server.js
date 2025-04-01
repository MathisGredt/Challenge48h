const express = require('express');
const app = express();
const path = require('path');

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'Enigme1/')));
app.use(express.static(path.join(__dirname, 'Enigme2/')));
app.use(express.static(path.join(__dirname, 'Enigme3/')));

/* Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'Enigme1/css')));
app.use(express.static(path.join(__dirname, 'Enigme2/css')));
app.use(express.static(path.join(__dirname, 'Enigme3/css')));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'Enigme1/js')));
app.use(express.static(path.join(__dirname, 'Enigme2/js')));
app.use(express.static(path.join(__dirname, 'Enigme3/js')));
 */

// Route par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Enigme1/html', 'index.html'));
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
