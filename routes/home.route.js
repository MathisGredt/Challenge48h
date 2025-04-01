const exp = require('constants');
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Home/html/index.html'));
});

router.use('/css', express.static(path.join(__dirname, '../Home/css')));
router.use('/js', express.static(path.join(__dirname, '../Home/js')));
router.use('/assets', express.static(path.join(__dirname, '../Home/assets')))
module.exports = router;
