

const fs   = require('fs');
const grpc = require('grpc');

const implementation = require('./clientImplementation');

const PROTO_PATH = './pb/msg.proto';
const serviceDef = grpc.load(PROTO_PATH);
const PORT = 3022;

const cacert = fs.readFileSync('./keys/ca.crt');
const cert   = fs.readFileSync('./keys/client.crt');
const key    = fs.readFileSync('./keys/client.key');
const kvpair = {'private_key': key, 'cert_chain': cert };

const credentials = grpc.credentials.createSsl(cacert, key, cert);
const client = new serviceDef.UserService(`Localhost:${PORT}`, credentials);

implementation.getByUserId(client);
implementation.getAll(client);
implementation.addImage(client);
implementation.saveAll(client);