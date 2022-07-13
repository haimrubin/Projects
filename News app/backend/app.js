const express = require('express');
const bodyParser = require("body-parser");
const usersRoutes = require('./routes/users-routes');
const postsRoutes = require('./routes/posts-routes');
const adminRoutes = require('./routes/admin-routes');
const HttpError = require("./models/http-error");
const path = require("path");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static(path.join('public')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/posts' ,postsRoutes); // => /api/posts ....
app.use('/api/users' ,usersRoutes); // => /api/users ....
app.use('/api/admin', adminRoutes); // => /api/admin ....


app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// error case last rote !!!
app.use((error,req, res, next) => {
    if(res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || 'Unknown error occurred'})
})



module.exports = app;