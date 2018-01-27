const express = require('express');
const app = express(); // express instance
const nunjucks = require('nunjucks');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

const locals = {
  title: 'An Example',
  people : [
    { name: 'Gandalf' },
    { name: 'Frodo' },
    { name: 'Hermione' }
  ]
};

// const people = [{name: 'Full'}, {name: 'Stacker'}, {name: "Son"}];
// app.render('index', {title: 'Hall of Fame', people: people})

nunjucks.render('index.html', locals, (err, output) => {
  if(err) console.log(err);
  console.log(output);
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req, res, next) => {
  res.render('index', locals, (err, output) => {
    if(err) return console.log(err);
    res.send(output);
  });
});

app.get('/news', (req, res, next) => {
  res.send('News');
});

const port = process.env.Port || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

