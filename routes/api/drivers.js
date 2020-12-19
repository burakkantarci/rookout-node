const express = require('express');
const router = express.Router();
const store = require('data-store')({ path: process.cwd() + '/f1.json' });

const displayDriverName = async (driver) => {
  return driver;
};

router.get('/:id', function (req, res) {
  res.json(store.data.drivers[req.params.id]);
  
  displayDriverName(store.data.drivers[req.params.id].name);

  return store.data.drivers[req.params.id]
})
module.exports = router;