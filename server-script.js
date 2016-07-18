const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      
      os = require('os'),
      
      readline = require('readline'),
      rl = readline.createInterface(process.stdin, process.stdout);

var engine = require('./js/engine.js'),
    ifaces = os.networkInterfaces(),
    address = ifaces['Wi-Fi'][1].address;





/*----FILE SEND----*/

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/favicon.ico', function(req, res){
    res.sendFile(__dirname + '/favicon.ico');
});
app.get('/css/style.css', function(req, res){
    res.sendFile(__dirname + '/css/style.css');
});


app.get('/js/client-script.js', function(req, res){
    res.sendFile(__dirname + '/js/client-script.js');
});
app.get('/js/libs/three.min.js', function(req, res){
    res.sendFile(__dirname + '/js/libs/three.min.js');
});
app.get('/js/libs/stl_loader.js', function(req, res){
    res.sendFile(__dirname + '/js/libs/stl_loader.js');
});
/*----FILE SEND----*/





/*----THE GOOD STUFF----*/

io.on('connection', function(socket){
    
    console.log('connected: [' + socket.id + ']');
    
    /*----CHEAT CHEET----*?
        socket.emit('string', 'data');
            |sends 'data' with string attached. the string will
            |tell the recipient what to do with the data
            
        socket.broadcast.emit('string', 'data');
            |sends 'data' with attached string to ALL
            |clients/servers connected
            
        socket.on('string', function('data'){
            //things to do with this data//
        });
            |when the client/server with this codes recieves
            |the  'string', it will perform a series of actions
            |with the attached 'data'
    
    ?*----CHEET SHEET----*/
    
    
    socket.on('hist', function(hist){
        if (hist === false) {
            socket.emit('world', engine.s_bodies);
        }
        socket.emit('START');
    });
    
    
    
    socket.on('disconnect', function(){
        console.log('disconnected: [' + socket.id + ']');
        io.emit('removePlayer', socket.id);
    });
});

/*----THE GOOD STUFF----*/





/*----PORT SET----*/
rl.setPrompt('>');
console.log('define server-port:');
rl.prompt();
rl.on('line', function(line){
    var port = Number(line);
    var ip_address ='0.0.0.0';
    http.listen(port, ip_address, function(){
        console.log('----Server Created----');
        console.log('IP-host: ' +  address);
        console.log('server-port: ' + port);
    });
    
}).on('close', function(){
    process.exit(0);
});
/*----PORT SET---*/