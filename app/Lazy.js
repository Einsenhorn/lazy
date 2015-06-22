module.exports = {
    Finder: {
        KeePass: require('./Lazy/Finder/KeePass')
    },
    Node: {
        Builder: {
            KeePass: require('./Lazy/Node/Builder/KeePass')
        },
        Node: require('./Lazy/Node/Node')
    }
};