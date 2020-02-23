const mongoose = require('mongoose');
//const fs = require('mz/fs');
const connect = require('./db');
const csv = require('mongoose-csv');
const Voter = require('./schema');
connect();

const Area = conn.model('area', areaSchema);
const filepath = "Voter.csv";
fs.readFile(filepath, function(err, data) {
    csv.parse(data, function(err, data) {
        data.forEach(function(e, i, a) {
            if (i != 0) {
                const aVoter = new Area({
                    first_name: e[0],
                    last_name: e[1],
                    zip: e[2],
                    history: e[3],
                });
                a.save();
            }
        });

    });
  });
