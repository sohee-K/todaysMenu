const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'calendars'
});

connection.connect();

connection.query('select cd_kyganjee, cd_kmganjee, cd_kdganjee from calenda_data where cd_sy = "1998" and cd_sm = "10" and cd_sd = "17";', 
    (error, results, fields) => {
        console.log(results[0].solution);
});

connection.end();