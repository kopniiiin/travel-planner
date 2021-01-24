const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/options', require('./routes/event-types'));

app.use((error, request, response) => {
  response.status(ResponseStatus.INTERNAL_SERVER_ERROR).json({message: 'Server error'});
})

async function start() {
  try {
    await mongoose.connect(config.get('dbURL'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(config.get('port'));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
