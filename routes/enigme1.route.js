const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme1/html/e1p1.html'));
});

router.get('/part2', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme1/html/e1p2.html'));
});

router.get('/part3', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme1/html/e1p3.html'));
});

router.get('/part5', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme1/html/e1p5.html'));
});

router.get('/part6', (req, res) => {
  res.sendFile(path.join(__dirname, '../Enigme1/html/e1p6.html'));
});

router.use('/css', express.static(path.join(__dirname, '../Enigme1/css')));
router.use('/js', express.static(path.join(__dirname, '../Enigme1/js')));
router.use('/assets', express.static(path.join(__dirname, '../Enigme1/assets')))
module.exports = router;
