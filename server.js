const express = require('express');

const app = express();


/*
Middleware is code that runs from the time the server receives a request up untill it sends back a response.
So the get method bellow is technically MiddleWare but in context of express it is the other things that happen before 
the get request function sends back a response
 */

//app.use(logger); //"Global Middleware" The "use" method excepts a function with req/res parameters ps. runs when req is received " duh it's MW"
                //The use method runs the middleware before get method thus loggin log before "Home Page" or "Users Page"

app.get('/', nexty, (req, res) => {
    res.send('<h1>Home Page</h1>');
    console.log("Home Page");
});

app.get('/users', auth, (req, res, next) => {
    res.send('<h1>Users Page</h1>' + req.admin);
    console.log('Users Page');
    next();                   //next runs the next piece of middleware the logger function
});

app.use(logger);//if logger is after get() method next() needs to be called in get method and runs after the get finishes with response and console log

function logger(req, res, next) {
    console.log('Logging');
    next();                         //next() lets the next function or middleware runs ps. the get method also has
}                                   //next callback but is pointless because response is already sent.

function auth(req, res, next) {    //This middleware function is called as a argument in get method and runs first
    if(req.query.admin === 'true') {
        req.admin = "Is admin"
        next();
    } else {
        res.send('Access Denied');
    }
    console.log('auth');                     
}   

function nexty(req, res, next) {
    console.log('before');
    next();      
    console.log('after'); 
    next()      //next does not excape funciton good way to run code after global middle ware  \
    console.log('code ran after global')         
}   

app.listen(3000);