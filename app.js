var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
const PORT = 3000;
const apikey = '31eb4af78380ae611f5fa3549b2a74bb';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.locals.weather = '';
app.locals.error = '';

app.get('/', function(req,res){
    res.render('index');
});

app.post('/', function(req,res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&APPID=${apikey}`;

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather:null, error: 'Error, please try again'})
        }else{
            
            let weather = JSON.parse(body);

            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            }else{
               
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(PORT, function(){
    console.log('Application listening on port ' + PORT);
});

