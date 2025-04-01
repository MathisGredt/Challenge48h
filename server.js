const express = require('express');
const app = express();
const path = require('path');

// Servir les fichiers statiques (mets tes fichiers dans 'public')
app.use(express.static(path.join(__dirname, 'Enigme2')));

// Route par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
