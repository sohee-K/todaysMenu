const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'project',
    password: '123456',
    database: 'calendars'
});

connection.connect();

connection.query('select cd_kyganjee, cd_kmganjee, cd_kdganjee from calenda_data where cd_sy = "1998" and cd_sm = "10" and cd_sd = "17";', 
    (error, results, fields) => {
        console.log(results[0].cd_kyganjee);
        console.log(results[0].cd_kmganjee);
        console.log(results[0].cd_kdganjee);
});

connection.end();