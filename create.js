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
file.on('line').then(function(line){
  const data = line.spit(',');
  voters.push(new Voter({first_name: data[0],
                        last_name: data[1],
                        zip: data[2],
                        history: data[3]
                      }));
    }).catch(error => console.error(error.stack));
