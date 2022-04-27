require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connect } = require('./database');
const usersRouter=require('../src/routes/users');
const favApiRouter=require('../src/routes/fav')
const { auth } = require('./utils/auth');

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.get('/',auth, (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "Bienvenidos a FAVS API " });
});

app.use('/auth/local',usersRouter);
app.use('/api',favApiRouter,(req,res)=>{
  console.log(req)
  console.log('Hola')
});
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});