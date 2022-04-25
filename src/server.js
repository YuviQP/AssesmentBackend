require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connect } = require('./database');
const usersRouter=require('./models/users')

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "Bienvenidos a FAVS API " });
});

app.use('/users',usersRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});