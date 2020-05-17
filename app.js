const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'personal_assistant'
})

connection.connect(function(err) {
  if(err) {
    return console.error('error: ', err.message);
  }
  console.log('Connected to MySQL');
})

app.get('/', (req, res) => res.send('Hola Mundo!'))

app.listen(port, () => console.log(`App listening at port ${port}`))