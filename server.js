const express = require('express');

const app = express();

const rookout = require('rookout');

rookout.start({
  token: '3218529d13a02689038f3648c8ada18afc50df01d9cdad08feb5010c16d1771b',
  labels:
    {
      "env":"dev" // Optional,see Labels page below Projects
    }
});



//Init Mw
app.use(express.json({ extended: false} ));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/test', require('./routes/api/test'))
app.use('/api/drivers', require('./routes/api/drivers'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));