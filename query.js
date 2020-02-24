const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database


const queries = [

  //How many registered voters live in the Canton zip code (13617)?
  Voter.find({zip: 13617}).length,
  //then(result =>(result.length)),

  //What are the full names of all the registered voters whose first-name is STARR?
  Voter.find().where('first_name').equals('Starr'),

  //How many people voted in the 2016 general election (GE16)?
  Voter.find({history: /GE16/i}).then(result =>(result.length)),

  //What is the last-name that comes last in the county in alphabetical order?
  Voter.find().sort('-last_name')

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
    console.log('How many registered voters live in the Canton zip code (13617): ', queries[0]);
    console.log('What are the full names of all the registered voters whose first-name is STARR: ', queries[1].map(p => p.first_name),queries[1].map(p => p.last_name));
    console.log('How many people voted in the 2016 general election (GE16)?: ', queries[2]);
    console.log('What is the last-name that comes last in the county in alphabetical order?: ', queries[3][0].last_name);
  //  console.log('Distinct ranks: ', results[4]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
