const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var articles = require('./routes/articles');
var users = require('./routes/users');

var app = express();

var db_config = {
	development : 'mongodb://localhost/blog',
	test : 'mongodb://localhost/blog-test'
}

var app_env = app.settings.env

mongoose.Promise = require('bluebird');

mongoose.connect(db_config[app_env],()=>{
	console.log('Database connected '+db_config[app_env])
})

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/api/users', users)
app.use('/api/articles', articles)

app.listen(app.get('port'),()=>{
	console.log('Connected to Port '+app.get('port'))
})

module.exports = app