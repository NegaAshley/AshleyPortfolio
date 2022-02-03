const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const enforce = require('express-sslify');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
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
    res.send('/sitemap.xml');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

// //Code from sitemap npm documentation for making a sitemape for SEO
// app.get('/sitemap.xml', function (req, res) {
//     res.header('Content-Type', 'application/xml');
//     res.header('Content-Encoding', 'gzip');
//     // if we have a cached entry send it
//     if (sitemap) {
//         res.send(sitemap);
//         return;
//     }

//     try {
//         const smStream = new SitemapStream({ hostname: 'https://ashleymxu.com/' });
//         const pipeline = smStream.pipe(createGzip());

//         // pipe your entries or directly write them.
//         smStream.write({ url: '/', changefreq: 'monthly', priority: 1.0 });
//         smStream.write({ url: '/resume', changefreq: 'monthly', priority: 0.7 });
//         smStream.write({ url: '/#about', changefreq: 'monthly', priority: 0.7 });
//         smStream.write({ url: '/#contact', changefreq: 'monthly', priority: 0.7 });

//         // cache the response
//         streamToPromise(pipeline).then(sm => sitemap = sm);
//         // make sure to attach a write stream such as streamToPromise before ending
//         smStream.end();
//         // stream write the response
//         pipeline.pipe(res).on('error', (e) => { throw e });
//     } catch (e) {
//         console.error(e);
//         res.status(500).end();
//     }
// });

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: \nSitemap: https://www.ashleymxu.com/sitemap.xml");
});
//app.use(robots(__dirname + '/robots.txt'));

// app.use('/sitemap.xml', function (req, res, next) {
//     res.type('text/plain')
//     res.send("User-agent: *\nDisallow: \nSitemap: https://www.ashleymxu.com/sitemap.xml");
// });