const express = require('express'),
    bodyParser = require("body-parser"),
    mysql = require('mysql');

const app = express();
const jsonParser = bodyParser.json();

function getGanjee(year, month, day, time) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'project',
        password: '123456',
        database: 'calendars'
    });

    connection.connect();

    let ganjee;
    connection.query(`select cd_kyganjee, cd_kmganjee, cd_kdganjee from calenda_data where cd_sy = ${year} and cd_sm = ${month} and cd_sd = ${day};`, 
        (error, results, fields) => {
            ganjee = {
                year : results[0].cd_kyganjee,
                month : results[0].cd_kmganjee,
                day : results[0].cd_kdganjee,
            };
    });

    connection.end();
    return ganjee;
}

function createApp() {
    app.use(express.static(__dirname));
    let urlencodedParser = bodyParser.urlencoded({ extended : false });

    app.listen(3000, () => {
        console.log("Server On");

        app.post("/", urlencodedParser, (request, response) => {
            console.log(request.body);
            
            response.writeHead("200");
            response.end();
        });
    });
}

function init() {
    createApp();
}

init();