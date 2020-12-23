const express = require('express');
const fs = require('fs');
const atob = require('atob');
const router = express.Router();

router.get('/kaboom.js', (req, res) => {
  const data = atob(fs.readFileSync('./lib/kaboom.js'));
  res.send(`<pre>${data}</pre>`);
});

router.get('/platformer.js', (req, res) => {
  const data = atob(fs.readFileSync('./lib/platformer.js'));
  res.send(`<pre>${data}</pre>`);
});

module.exports = router;