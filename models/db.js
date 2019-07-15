const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err){ console.log('MONGODB connection success'); }
    else{ console.log('MONGODB not connected : ' + JSON.stringify(err, undefined, 2 )); }
});

require('./user.models')
