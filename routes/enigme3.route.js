const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme2/html/login.html'));
});

router.get('/part2', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme2/html/lorem.html'));
});

router.get('/part3', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme2/html/music.html'));
});

router.get('/part4', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme2/html/security.html'));
});

router.get('/part4/Challenge49h', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme2/html/challenge49h.html'));
});

router.get('/rickroll', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme2/html/rickroll.html'));
});

router.use('/css', express.static(path.join(__dirname, '../Enigme2/css')));
router.use('/js', express.static(path.join(__dirname, '../Enigme2/js')));
router.use('/assets', express.static(path.join(__dirname, '../Enigme2/assets')));

module.exports = router;
