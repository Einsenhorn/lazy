var path = require('path');
var kpio = require('keepass.io');
var Lazy = require('./app/Lazy');

var database = new kpio.Database();
var databasePath = 'Fidesio.kdbx';

var roots = [
    'Fidesio/fidesio/thot - 192.168.0.210/basty',
    'Fidesio/fidesio/thot - 192.168.0.210/aker'
];

database.addCredential(new kpio.Credentials.Password('fidesio'));
database.loadFile(databasePath, function(err) {
    if (err) {
        throw err;
    }

    var finder = new Lazy.Finder.KeePass();
    var builder = new Lazy.Node.Builder.KeePass();
    var rootNode = builder.build(database.getBasicApi().getGroupTree());

    var i, l, node;
    for (i = 0, l = roots.length ; i < l ; i++) {
        node = finder.find(roots[i], rootNode);
        if (node === null) {
            throw new Error('node `' + roots[i] + '`not found');
        } else {
            node.loadData(database.getBasicApi());
            console.log(node.data['SSH / SFTP']);
        }
    }
});
