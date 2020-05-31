const express = require('express');
const { join } = require('path');

const app = express();

app.use(express.static(join(__dirname, 'dist')));

app.get('/sw.js', (req, res) => {
  res.sendFile(join(`${__dirname}/src/client/utils/serviceWorkers/sw.js`));
});

app.get('*', (req, res) => {
  res.sendFile(join(`${__dirname}/dist/index.html`));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Web client is listening on port ${port}`);
});

