/* module.exports = {

    'url' : 'mongodb://localhost:27017/blog-bang' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
     
     //Please replace your host file Here : 127.1.1.0 , Express is Collection Name (Database Name)
}; */ 

const dotenv = require('dotenv').load();

module.exports = {
    /* 'url' : 'mongodb://localhost:27017/cfdtvote' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot */
    'url': process.env.MONGODATA
}