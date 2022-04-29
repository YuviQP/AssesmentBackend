require('dotenv').config()
const express = require('express');
const cors = require('cors');
const usersRouter=require('../src/routes/users');
const favApiRouter=require('../src/routes/fav')
const { auth } = require('./utils/auth');

const app = express();

app.use(express.json());
app.use(cors());
app.get('/',(req, res) => {
res.status(200).json({ message: "Bienvenidos a FAVS API " });
});

app.use('/auth/local',usersRouter);
app.use('/api',favApiRouter,(req,res)=>{
console.log(req)
console.log('Hola')
});

module.exports={ app }