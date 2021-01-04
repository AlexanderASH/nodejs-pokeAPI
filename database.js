const mongoose = require('mongoose');

let password = 'root2020';
let databaseName = 'db';

mongoose.connect(`mongodb+srv://admin:${password}@cluster0.qo40p.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true});