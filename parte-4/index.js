var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/tdciasc");

//definimos e configuramos o restify
var server = restify.createServer({
    name: 'restify.mongoose.api',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

//criamos o esquema do Mongoose
var DeveloperSchema = new mongoose.Schema({
    name : { type : String, required : true },
    birthdate : { type : Date },
    languages : [String],
    projects : [{
      name: String,
      languages: [String]
     }]
});

//criamos o Model Developer
var Developer = mongoose.model('developers', DeveloperSchema);

//configuramos o restifyMongoose para mapear as rotas para developers
restifyMongoose(Developer).serve('/api/developers', server);

//server escutando a porta 3000
server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
