const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3005;
var cors = require('cors');

const mysql = require('mysql');
const connection = mysql.createConnection({
  connectionLimit: 10,
  host     : 'rm-6gj8nn1cm85hux6cxio.mysql.ap-south-1.rds.aliyuncs.com',
  user     : 'akansha',
  password : 'Akasud25',
  database : 'CoinFolioDB'
});

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.type('application/json');
  res.send({ express: 'Hello From Express' });
});

app.get('/userCheck/', (req,res) => {
  console.log(req.query.email);
   var query = "SELECT id, email FROM users WHERE email=" + mysql.escape(req.query.email);

  connection.query(query, function (error, results, fields) {
    if (error){
      res.sendStatus(400);
    } else{
      res.type('application/json');
      res.set('Access-Control-Allow-Origin', "*");
      res.send(JSON.stringify(results[0]));
    }
  });;
});


app.post('/validDateUser', (req,res) => {
  var query = "SELECT id FROM users WHERE email=" + mysql.escape(req.body.email) + ' and acctpass='+mysql.escape(req.body.password)
 connection.query(query, function (error, results, fields) {
   if (error){
     res.sendStatus(400);
   }
   res.type('application/json');
   res.set('Access-Control-Allow-Origin', "*");
   res.send(JSON.stringify(results[0]));
 });
});


app.post('/newUser', (req,res) => {
  console.log(req.body);
  var query = mysql.format('INSERT INTO users(email, acctpass) values(?,?)', [req.body.email, req.body.password]);

 console.log(query);
 connection.query(query, function (error, results, fields) {
   if (error){
     res.sendStatus(400);
   }
   res.type('application/json');
   res.set('Access-Control-Allow-Origin', "*");
   console.log(results.affectedRows);
   res.send(JSON.stringify(results.affectedRows));
 });
});



// app.get('*', (req,res) => {
//  res.sendFile(path.join(__dirname, 'client/web/builds/index.html'));
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
