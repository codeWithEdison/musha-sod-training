// import required libraries

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt')

// looad environement vaiables from .env
dotenv.config();

const app = express();
// middle ware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// initialise app
// middle ware to verfy jwt

const authenticateToken =  (req, res, next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(!token) return res.status(401).json({message: 'unauthorized'})

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      if(err) return res.status(403).json({message: 'forbidden'})
    req.user = user
  next()
    });
}
// database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
// connect to db
db.connect((err) => {
  if (err) throw err;
  console.log("db connected successfull");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to our api" });
});

// api to register user
app.post("/api/auth/register",  async (req, res) => {
  try {
    //  let username = req.body.username;
    //  let password = req.body.password;
    //  let email=req.body.email
    let {username, email, pasword} = req.body;
    if( !username | !pasword | !email){
        return res.status(400).json({message: 'all field are required'})
    }

    const  salt=  await bcrypt.genSalt(10); 
    const hashedPassword =  await bcrypt.hash(pasword, salt);

    let insertQuery = `INSERT INTO users (username, email, password)
      VALUES (?,?,?)`;
// insert into users (username, email, password) value(john doe, 'johndoe@gmail.com', 'password');
    db.query(insertQuery,[username, email, hashedPassword], (err, results)=>{
        if(err) {
            throw err;
            return res.status(500).json({message: 'error in creting user', error: err.message})
        }
        res.status(201).json(results[0])
    })

  } catch (err) {
    throw err
    res.status(500).json(
        { message: "server error", error: err.message });
  }
});

// api for login 
app.post('/api/auth/login', async (req, res)=>{
try{
const {username, password} = req.body;
if(!username | !password){
    return res.status(400).json({message: 'all field are required'})
}
// find user by username
db.query('SELECT * FROM users WHERE username = ?', [username],
   async(err, result)=>{
     if(err) throw err;
     if(result.length === 0){
        return res.status(401).json({message: 'Invalid username or password'})
     }
     const user = result[0];
      // check password
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword){
        return res.status(401).json({message: 'Invalid username or password'})
      }
     
      // generate jwt token
      const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
      );
      res.status(200).json({message: 'login sucessfull', token})
   });
} catch(err){
  throw err;
    res.status(500).json({message: 'server error', error: err.message})
}
})

// api to get alll users (protected route)

app.get("/api/users", authenticateToken, (req, res) => {
  try{
    db.query("SELECT * FROM users", (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    });
  } catch(err){
    throw err;
    res.status(500).json({message: 'server error', error: err.message})
  }
});
// start server
app.listen(5000, () => {
  console.log("Server started on port 5000....");
});
