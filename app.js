const path = require('path');
const express = require('express');
const routes = require('./routes/index');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});

//Routes
app.use('/', routes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});