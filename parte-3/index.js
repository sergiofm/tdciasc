var cep = require("cep-promise");
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
  var query = url.parse(req.url, true).query;
  console.log("buscando cep ", query.cep);
  cep(query.cep).then(function(address){
    console.log("endereço encontrado ", address);
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    res.end(JSON.stringify(address));
  }).catch(function(err){
    res.end(err.message);
  });
});

server.listen(3000, function () {
  console.log("server no ar");
});
