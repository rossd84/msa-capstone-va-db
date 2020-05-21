const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express();
const port = 4000;



const con = mysql.createConnection({
  host:'localhost',
  user: 'root',
  passwork: '',
  database: 'personal_assistant'
})

con.connect(err => {
  if(err) {
    return err;
  }
})

app.use(cors())

app.get('/', (req, res) => {
  res.send('App is working!')
})

app.get('/items/add', (req, res) => {
  const { user_id, item, list_type } = req.query;
  const INSERT_ITEMS_QUERY = `INSERT INTO item_list (user_id, item, list_type) VALUES (${user_id}, '${item}', ${list_type})`;
  con.query(INSERT_ITEMS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    }
    return res.send('successfully added product')
  })
})

const SELECT_ALL_ITEMS_QUERY = 'SELECT item FROM item_list;'
app.get('/items', (req, res) => {
  con.query(SELECT_ALL_ITEMS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    return res.json({
      data: results
    })
  })
})

const SELECT_PERSONAL_ITEMS_QUERY = 'SELECT item FROM item_list WHERE list_type=1;'
app.get('/items/personal', (req, res) => {
  con.query(SELECT_PERSONAL_ITEMS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    return res.json({
      data: results
    })
  })
})

const SELECT_WORK_ITEMS_QUERY = 'SELECT item FROM item_list WHERE list_type=2;'
app.get('/items/work', (req, res) => {
  con.query(SELECT_WORK_ITEMS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    return res.json({
      data: results
    })
  })
})

app.get('/user', (req, res) => {
  const { user_id, username } = req.query;
  const SELECT_USER_QUERY =  `SELECT id, username FROM users WHERE username='${username}'`
  con.query(SELECT_USER_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    }
    return res.json({
      data: results
    })
  })
})

app.get('/user/add', (req, res) => {
  const { user_id, username } = req.query;
  const INSERT_USER_QUERY = `INSERT INTO users (username) VALUES ('${username}')`;
  con.query(INSERT_USER_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    }
    return res.json({
      data:results
    })
  })
})

app.listen(port, () => {
  console.log(`Listening on port:${port}`)
})