const fs   = require('fs');
const grpc = require('grpc');

const implementation = require('./serverImplementation');

const PROTO_PATH = './pb/msg.proto';
const serviceDef = grpc.load(PROTO_PATH);
const PORT = 3022;

const cacert = fs.readFileSync('./keys/ca.crt');
const cert = fs.readFileSync('./keys/server.crt');
const key = fs.readFileSync('./keys/server.key');
const kvpair = {'private_key': key, 'cert_chain': cert};

const credentials = grpc.ServerCredentials.createSsl(cacert, [kvpair]);
const server = new grpc.Server();

server.addProtoService(serviceDef.UserService.service, {
    getByUserId: implementation.getByUserId,
    getAll: implementation.getAll,
    save: implementation.save,
    saveAll: implementation.saveAll,
    addImage: implementation.addImage
});

server.bind(`0.0.0.0:${PORT}`, credentials);
console.log(`Starting server on port ${PORT}`);
server.start();
