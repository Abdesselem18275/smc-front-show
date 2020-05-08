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
app.use(express.static('./dist/'));


// app.get('/*', function(req,res) {
//   const supportedLocales = ['en','fr','de'];
//   const defaultLocale = 'en';
//   //const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
//   const matches = req.url.match(/(^\/\w{2})(\/\w{2})*/).filter(x => x !== undefined).map(x => x.toLowerCase().replace('/',''));
//   console.log('url ='+req.url);
//   console.log('matches ='+ matches);
//   console.log('base ='+ req.baseUrl);

//   console.log('last ='+ matches[matches.length-1]);
//   //check if the requested url has a correct format '/locale' and matches any of the supportedLocales
//   const locale = (matches && supportedLocales.indexOf(matches[matches.length-1]) !== -1) ?
//                   matches[matches.length-1] : defaultLocale;
//   console.warn(locale);
//   console.warn(path.join(__dirname,'dist',locale,'index.html'));
//   res.sendFile(path.join(__dirname,'dist',locale,'index.html'));
// });

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname,'dist/en/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
