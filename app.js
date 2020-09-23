const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/add-product', (req, res, next) => {
  console.log('In the second middleware!');
  res.send(
    '<form action="/product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  console.log('In the second middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
