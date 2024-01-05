const mongoose = require('mongoose');

main().then(()=>{
    console.log('connection to database established');
}).catch((err)=>{
    console.log('could not  connected to database');
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/codeial');
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;