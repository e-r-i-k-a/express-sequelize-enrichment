const Express = require ('express');
const app = Express();
const router = Express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const models = require('./models/database.js');
const routes = require('./routes/index.js')
const User = models.User;
const Award = models.Award;
const PORT = 3000;

app.use (morgan ('dev'));
app.use(bodyParser.json());
app.use (bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res, next) {
  res.status(200).send('Welcome to my Express-Sequelize Enrichment Project!')
})

app.use('/', routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Error");
});

app.listen(PORT, function(){
  console.log('listening on port', PORT)
})

module.exports = app;
