const database = require('../database/database.json');
const path = require('path');

function portraitLookup(matno, bot) {
    var diskLocations = database[matno]; 

    if (bot) return diskLocations;

    return diskLocations.map(location => path.basename(location));
}

function isMatno(matno) {
    const regex = /^\d{2}[a-zA-Z]{2}\d{6}$/;        //matno regex

    if (regex.test(matno)) return true;
    else return false 
}

module.exports = { isMatno, portraitLookup };