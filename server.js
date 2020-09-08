//Install express server
const compression = require('compression')
const express = require('express');
const path = require('path');

const app = express();
app.use(compression())
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }


// Serve only the static files form the dist directory
app.use(express.static('./dist/browser/'));

app.get('/*', function(req,res) {
  const supportedLocales = ['fr-FR','de-DE','en-US'];
  const defaultLocale = 'en-US'
  const matches = req.url.match(new RegExp(supportedLocales.join('|'),"g"));
  const urlLocalChunk = matches ? matches[matches.length-1] : defaultLocale
  res.sendFile(path.join(__dirname,'dist','browser',urlLocalChunk,'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
