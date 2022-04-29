const mongoose = require('mongoose');
const URI=process.env.DATABASE;
let connection;
async function connect() {
  if(connection)return;
  connection=mongoose.connection;
  mongoose.connection.once('open', () => {
    console.log('Database successfully connected');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Successfully disconnected');
  });
  mongoose.connection.on('error', () => {
    console.log('Something went wrong');
  });
  await mongoose.connect(URI);
}

async function disconnect(){
  if(!connection)return;
  await mongoose.disconnect();
}
async function cleanup() {
  if(connection) {
    const promises = [];

    for(const collection in connection.collections) {
      promises.push(connection.collections[collection].deleteMany({}));
    }

    await Promise.all(promises);
  }
}

module.exports = { connect,disconnect,cleanup}