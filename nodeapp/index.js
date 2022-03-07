const express = require('express');

const app = express();
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

const mysql = require('mysql')

const connection = mysql.createConnection(config)

const sql0 = `CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;
connection.query(sql0, function(err, result){
    if (err) throw err;
});
connection.end();

app.get('/', (req, res) => {

    const connection = mysql.createConnection(config)
    const sql1 = `INSERT INTO people(name) values('Henrique')`
    connection.query(sql1)
  
    const sql2 = `SELECT name FROM people`
    connection.query(sql2, function(err, result){
        if (err) throw err;
        res.render('index.html', { results : result });
    });

    console.log('Closing db connection')
    connection.end();
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})