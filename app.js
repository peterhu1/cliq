
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
//added for partials
var partials = require('express-partials')
var index = require('./routes/index');
var login = require('./routes/login');
var games = require('./routes/games');
var user = require('./routes/user');
var search = require('./routes/search');
var assignment = require('./routes/assignment');
var confirmation = require('./routes/confirmation');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//added for partials
app.use(partials());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', games.view);
//app.get('/nw-home', index.viewNewUserAlternate);
app.get('/login', login.view);
app.get('/logout', login.logout);
// app.get('/matches', matches.view);
app.get('/search', search.view);
app.get('/assignment', assignment.view);
app.get('/confirmation', confirmation.view);
app.get('/get_classes_query', search.get_classes_from_query);

app.get('/new-profile', user.create_new_profile);
app.get('/update-profile', user.render_update_profile);
app.post('/post-login', user.login_or_signup);
app.post('/post-create-profile', user.handle_create_profile);
app.post('/post-update-profile', user.handle_update_profile);
// app.post('/post-update-match-request', matches.update_request);
// app.post('/post-create-match-request', matches.create_match_request);
// app.post('/delete-match-request', matches.delete_match_request);
// app.post('/delete-match', matches.delete_match);
// app.post('/edit-match-request', matches.edit_match_request);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
