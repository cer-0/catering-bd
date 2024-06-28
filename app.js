const path = require('path');
const express = require('express');
const mainRoutes = require('./routes/main-router');
const apiRoutes = require('./routes/api');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});

//Routes
app.use('/', mainRoutes);
app.use('/api', apiRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});