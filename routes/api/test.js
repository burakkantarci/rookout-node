const express = require('express');
const router = express.Router();

const symbols = [
  {
    category: 'golds',
    short_code: 'gram-altin'
  },
  {
    category: 'currencies',
    short_code: 'USD'
  },
  {
    category: 'currencies',
    short_code: 'EUR'
  },
  {
    category: 'parities',
    short_code: 'EUR-USD'
  },
  {
    category: 'currencies',
    short_code: 'GBP'
  },
  {
    category: 'indexes',
    short_code: 'XU100'
  },
  {
    category: 'bonds',
    short_code: 'TAHVIL'
  },
  {
    category: 'coins',
    short_code: 'bitcoin'
  }
]

router.get(('/'), async (req,res) => {
  try {
    res.json(symbols);
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router;