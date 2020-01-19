
//Install express server
const compression = require('compression')
const express = require('express');
const path = require('path');

const app = express();
app.use(compression())

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
  }


// Serve only the static files form the dist directory
app.use(express.static('./dist/'));


app.get('/*', function(req,res) {

  const supportedLocales = ['en','fr','de'];
  const defaultLocale = 'en';
  const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
  //check if the requested url has a correct format '/locale' and matches any of the supportedLocales
  const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;
  console.log(path.join(__dirname,'dist',locale,'index.html'));


  res.sendFile(path.join(__dirname,'dist',locale,'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);