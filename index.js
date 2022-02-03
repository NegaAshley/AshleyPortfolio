const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const enforce = require('express-sslify');
const robots = require('express-robots-txt')
const port = process.env.PORT || 3000;//Setting port to pick up port from Heroku.
let sitemap;

app.use(enforce.HTTPS({ trustProtoHeader: true }));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.use(express.static(path.join(__dirname, '/public')));//Serve static assets, such as CSS.  Takes absolute path to index.js file and adding on public.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('homePage');
});

app.get('/resume', (req, res) => {
    res.render('resume');
});

app.get('/sitemap.xml', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send('sitemap.xml');
});

// app.get('/robots.txt', (req, res) => {
//     res.set('Content-Type', 'text/plain');
//     //res.send("User-agent: *\nDisallow: \nSitemap: https://www.ashleymxu.com/sitemap.xml");
//     res.render('Robots.txt');
// });

app.use(robots('Robots.txt'));

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

// app.use('/robots.txt', function (req, res, next) {
//     res.type('text/plain');
//     res.send("User-agent: *\nDisallow: \nSitemap: https://www.ashleymxu.com/sitemap.xml");
// });
//app.use(robots(__dirname + '/robots.txt'));