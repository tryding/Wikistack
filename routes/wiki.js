const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Its working')
});

router.post('/', (req, res, next) => {
  res.send('Its working')
});

router.get('/add', (req, res, next) => {
  res.send('Its working')
});

module.exports = {
  router
}
