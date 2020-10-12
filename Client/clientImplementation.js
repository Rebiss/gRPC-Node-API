const fs   = require('fs');
const grpc = require('grpc');

module.exports = {
    getByUserId: function (client) {
        const md = new grpc.Metadata();
        md.add("username", 'rebiss');
        md.add("password", "rootik");

        client.getByUserId({ userId: 1 }, md,  (err, res) => err ? console.log(err) : console.log(res.user));
    },
    getAll: function (client) {
        const call = client.getAll({});
        call.on('data', data => console.log('>>>DATA_LUZER>>', data.user ));
    },

    addImage: function (client) {
        const md = new grpc.Metadata();
        md.add("userId", "1");
        const call = client.addImage(md, (err, result) => console.log('>>>RES>>', result ));

        const stream = fs.createReadStream("./img/ab.jpg");

        stream.on("data", chunk => call.write({data: chunk}));
        stream.on("end", () => call.end());
    },

    saveAll: function (client) {
        const users = [
            {
                id: 4,
                firstName: 'Andranik',
                lastName: 'Barseghyan',
                birthday: new Date(1999, 11, 22).getTime(),
                vehicles: [
                    { id: 7, regNumber: 'MLOLOMMLO200' },
                    { id: 8, regNumber: 'GHYIOPKL9328' }
                ]
            }
        ];

        const call = client.saveAll();
        call.on("data", usr => console.log(usr.user));

        users.forEach( usr => call.write({user: usr}));
        call.end();
    }
};
