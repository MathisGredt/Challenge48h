const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme3/html/e3p1.html'));
});

router.get('/part2', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme3/html/e3p2.html'));
});

router.get('/part3', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme3/html/e3p3.html'));
});

router.use('/css', express.static(path.join(__dirname, '../Enigme3/css')));
router.use('/js', express.static(path.join(__dirname, '../Enigme3/js')));
router.use('/assets', express.static(path.join(__dirname, '../Enigme3/assets')));

module.exports = router;