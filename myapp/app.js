const express = require('express');

const app = express();

app.get('/contact/:id', (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

app.listen(3000, () => {
  // console.log('App listening on port 3000!');
});

app.use((req, res, next) => {
  // console.log('Наше проміжне ПЗ');
  next();
});
