/**
 * Created by Fidesio on 03/03/2015.
 */

var Node = require('../Node');

function KeePass() {

}

KeePass.prototype.build = function(root) {
    var tree, i, l;

    if (!Array.isArray(root)) {
        throw new Error('TODO');
    }

    tree = new Node(null, 'root');
    for (i = 0, l = root.length ; i < l; i++) {
        tree.children.push(this.__buildNode(root[i]));
    }

    //this.print(tree);

    return tree;
};

KeePass.prototype.__buildNode = function(el) {
    var node = new Node(el.UUID, el.Name);

    if (Array.isArray(el.Groups)) {
        var i, l, groups = el.Groups;
        for (i = 0, l = groups.length; i < l ; i++) {
            node.children.push(this.__buildNode(groups[i]));
        }
    }

    return node;
};

KeePass.prototype.print = function(tree) {
    var loop = function(element, depth) {
        var s = '', counter = depth;
        while (counter-- > 0) { s += '\t'; }
        console.log(s + element.name);

        var i, l;
        for (i = 0, l = element.children.length ; i < l ; i++) {
            loop(element.children[i], depth + 1);
        }
    };

    loop(tree, 0);
};

module.exports = KeePass;
