const mongoose = require('mongoose');
const URI=process.env.DATABASE;
function connect() {
  mongoose.connect(URI);
  mongoose.connection.once('open', () => {
    console.log('Database successfully connected');
  });
  mongoose.connection.on('error', () => {
    console.log('Something went wrong');
  });
}
module.exports = { connect }