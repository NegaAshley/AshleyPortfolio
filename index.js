const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));//Serve static assets, such as CSS.  Takes absolute path to index.js file and adding on public.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('homePage');
});

app.get('/resume', (req, res) => {
    res.render('resume');
});

const port = process.env.PORT || 3000;//Setting port to pick up port from Heroku.
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});