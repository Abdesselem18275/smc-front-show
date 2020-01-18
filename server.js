
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
app.use(express.static('./dist/smc-show-case'));


app.get('/*', function(req,res) {
  console.log('%O', req);
res.sendFile(path.join(__dirname,'/dist/smc-show-case/index.html'));
});





// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);