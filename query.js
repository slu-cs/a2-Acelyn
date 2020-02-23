const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database


const queries = [

  //How many registered voters live in the Canton zip code (13617)?
  Voter.find({zip: 13617}).then(result =>(result.length)),

  Voter.find({first_name: 'Starr'}).then(result =>(result))

        ]



  // Who started most recently?
  //Voter.find().sort('-started').limit(1),

  // Who started in 2003?
//  Professor.find().where('started').equals(2003),

  // Who teaches 362?
//  Professor.find().where('courses').in(362),

  // What are all the ranks?
//  Professor.distinct('rank')
//];

// Run the queries in parallel
Promise.all(queries)
  .then(function(queries) {
    console.log('How many registered voters live in the Canton zip code (13617)?', queries[0]);
    console.log('What are the full names of all the registered voters whose first-name is STARR?', queries[1]);
  //  console.log('Started in 2003: ', results[2].map(p => p.name));
  //  console.log('Teaches 362: ', results[3].map(p => p.name));
  //  console.log('Distinct ranks: ', results[4]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
