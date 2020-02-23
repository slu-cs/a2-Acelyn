const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});
connect();

const voters = []
file.on('line', function(line){
  const data = line.split(',');
  voters.push(new Voter({first_name: data[0],
                        last_name: data[1],
                        zip: data[2],
                        history: data[3]
                      }));
    });

file.on('close', function() {
    mongoose.connection.dropDatabase()
      .then(() => voters.map(v=>v.save()))
      .then(() => mongoose.connection.close())
      .then(() => console.log('Database is ready.'))
      .catch(error => console.error(error.stack));
  });
