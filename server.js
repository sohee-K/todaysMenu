const express = require('express'),
    app = express(),
    mysql = require('mysql');

function getGanjee(year, month, day, time) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'project',
        password: '123456',
        database: 'calendars'
    });

    connection.connect();

    connection.query(`select cd_kyganjee, cd_kmganjee, cd_kdganjee from calenda_data where cd_sy = ${year} and cd_sm = ${month} and cd_sd = ${day};`, 
        (error, results, fields) => {
            let ganjee = {
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
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.listen(3000, () => {
        console.log('Server On');
        app.get('/', (request, response) => console.log(request));
    });
}

function init() {
    createApp();
}

init();