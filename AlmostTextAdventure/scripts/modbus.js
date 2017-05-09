/* Simple modbus client-server implementation for innovation day */
/* jshint esnext: true */
/* global require, Uint8Array */
/* We need sockets */
var net = require('net');

/* Underlying net server and client */
var mserver, mclient;
var mslaveAddress;
/* MODBUS slave */
function modbusServer(port = 80, host = '127.0.0.1', slaveAddress = 1){
    mslaveAddress = slaveAddress;
    mserver = net.createServer(function(socket){
        
        socket.pipe(socket);
        
        socket.on('data', function(data){
            
        });
        
        socket.on('connected', function(){
             console.log("Server: Client connected");
        });
    });
    
    this.listen = function(){
        mserver.listen(port, host);
    };
    
    console.log("Server created");
}

/* MODBUS master */
function modbusClient(port = 80, host = "127.0.0.1"){
    var transactionIdentifier = 0x0000;
    var buffer = new Array();
    mclient = new net.Socket();
    
    this.connect = function(){
        console.log("Trying to connect...");
        mclient.connect(port, host, function(){
            console.log("Client connected");
        });
    };
    
    mclient.on('data', function(data){
        for(var i=6;i<data.length;i++){
            buffer[i-6] = (data[i]);
        }
    });
    
    this.readResponse = function(){
        return buffer;
    };
    
    /* MODBUS implementation */
    this.readCoilStatus = function(slaveAddress, firstCoil, numCoils){
        var request = new Buffer(12);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 4);          // Transaction identifier
        request[1] = (transactionIdentifier << 4 >> 4);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x06);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x01);                                // Function code
        request[8] = (firstCoil >> 4);                      // Data address
        request[9] = (firstCoil << 4 >> 4);
        request[10]= (numCoils >> 4);                       // Count
        request[11]= (numCoils << 4 >> 4);
        
        mclient.write(request);                             // GO
        
    };
    this.readInputStatus = function(slaveAddress, firstCoil, numCoils){
        var request = new Buffer(12);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 4);          // Transaction identifier
        request[1] = (transactionIdentifier << 4 >> 4);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x06);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x02);                                // Function code
        request[8] = (firstCoil >> 4);                      // Data address
        request[9] = (firstCoil << 4 >> 4);
        request[10]= (numCoils >> 4);                       // Count
        request[11]= (numCoils << 4 >> 4);
        
        mclient.write(request);                             // GO
    };
    this.readHoldingRegisters = function(slaveAddress, firstCoil, numCoils){
        var request = new Buffer(12);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 8);          // Transaction identifier
        request[1] = (transactionIdentifier << 8 >> 8);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x06);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x03);                                // Function code
        request[8] = (firstCoil >> 8);                      // Data address
        request[9] = (firstCoil << 8 >> 8);
        request[10]= (numCoils >> 8);                       // Count
        request[11]= (numCoils << 8 >> 8);
        
        mclient.write(request);                             // GO
    };
    this.readInputRegisters = function(slaveAddress, firstCoil, numCoils){
        var request = new Buffer(12);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 4);          // Transaction identifier
        request[1] = (transactionIdentifier << 4 >> 4);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x06);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x04);                                // Function code
        request[8] = (firstCoil >> 4);                      // Data address
        request[9] = (firstCoil << 4 >> 4);
        request[10]= (numCoils >> 4);                       // Count
        request[11]= (numCoils << 4 >> 4);
        
        mclient.write(request);                             // GO
    };
    this.forceSingleCoil = function(slaveAddress, firstCoil, status){
        var request = new Buffer(12);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 4);          // Transaction identifier
        request[1] = (transactionIdentifier << 4 >> 4);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x06);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x05);                                // Function code
        request[8] = (firstCoil >> 4);                      // Data address
        request[9] = (firstCoil << 4 >> 4);
        if(status == "ON"){
            request[10]= (0xFF);                            // Status ON
            request[11]= (0x00);
        }
        else if(status == "OFF"){
            request[10]= (0x00);                            // Status OFF
            request[11]= (0x00);
        }
        else{
            request[10]= (0x0F);                            // Status ERROR
            request[11]= (0x0F);
        }
        mclient.write(request);                             // GO
    };
    this.presetSingleRegister = function(slaveAddress, firstCoil, value){
        var request = new Buffer(12);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 4);          // Transaction identifier
        request[1] = (transactionIdentifier << 4 >> 4);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x06);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x06);                                // Function code
        request[8] = (firstCoil >> 4);                      // Data address
        request[9] = (firstCoil << 4 >> 4);    
        request[10]= (value >> 4);                          // Value
        request[11]= (value << 4 >> 4); 
        mclient.write(request);                             // GO
    };
    /* TODO check if this is ok */
    this.forceMultipleCoils = function(slaveAddress, firstCoil, values){
        var numCoils = values.length;
        var bytesNeeded = Math.ceil(numCoils/8.0);
        var request = new Buffer(13+bytesNeeded);
        request.fill(0);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 4);          // Transaction identifier
        request[1] = (transactionIdentifier << 4 >> 4);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x07+bytesNeeded);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x0F);                                // Function code
        request[8] = (firstCoil >> 4);                      // Data address
        request[9] = (firstCoil << 4 >> 4);    
        request[10]= (numCoils >> 4);                       // Count
        request[11]= (numCoils << 4 >> 4);
        request[12]= bytesNeeded;                           // Byte count
        for(var i=0;i<numCoils;i++){
            request[13+Math.floor(i/8)] = request[13+Math.floor(i/8)] + (values[i] << i%8);
        }
        mclient.write(request);                             // GO
    };
    this.presetMultipleRegisters = function(slaveAddress, firstCoil, values){
        var numCoils = values.length;
        var bytesNeeded = numCoils * 2;
        var request = new Buffer(13+bytesNeeded);
        request.fill(0);
        transactionIdentifier++;                            
        request[0] = (transactionIdentifier >> 8);          // Transaction identifier
        request[1] = (transactionIdentifier << 8 >> 8);
        request[2] = (0x00);                                // Protocol identifier (always 0x0000)
        request[3] = (0x00);
        request[4] = (0x00);                                // Message length
        request[5] = (0x07+bytesNeeded);
        request[6] = slaveAddress;                          // Slave address
        request[7] = (0x10);                                // Function code
        request[8] = (firstCoil >> 8);                      // Data address
        request[9] = (firstCoil << 8 >> 8);    
        request[10]= (numCoils >> 8);                       // Count
        request[11]= (numCoils << 8 >> 8);
        request[12]= bytesNeeded;                           // Byte count
        for(var i=0;i<numCoils;i++){
            request[13 + i*2] = (values[i] >> 8);
            request[13 + i*2 + 1] = (values[i] << 8 >> 8);
        }
        mclient.write(request);                             // GO
        console.log(request);
    };
    console.log("Client created");
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

    