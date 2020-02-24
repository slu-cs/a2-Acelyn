// Store some data in the database
const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
//read the file
const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});
connect(); // To the database

// create some voters using information from csv file
const voters = []
file.on('line', function(line){
  const data = line.split(',');
  voters.push(new Voter({first_name: data[0],
                        last_name: data[1],
                        zip: data[2],
                        history: data[3]
                      }));
    });

// close the file and reset the data
file.on('close', function() {
    mongoose.connection.dropDatabase()
      .then(() => Promise.all(voters.map(v=>v.save())))
      .then(() => mongoose.connection.close())
      .then(() => console.log('Database is ready.'))
      .catch(error => console.error(error.stack));
  });
