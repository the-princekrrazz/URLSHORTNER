const mongoose = require('mongoose')
async function connectwithDB(url){
    return mongoose.connect(url);
};
module.exports = connectwithDB;