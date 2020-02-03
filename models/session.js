const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  shape: {
    type: String,
    required: true
  },
  windDir: {
    type: String,
    required: true
  }
})


const sessionsDB = mongoose.connection.useDb('sessions');

const sessionInfo = sessionsDB.model('sessions', sessionSchema);

module.exports = sessionInfo;
