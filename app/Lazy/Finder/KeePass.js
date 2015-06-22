/**
 * Created by Fidesio on 03/03/2015.
 */

function KeePass(delimiter) {
    this.delimiter = typeof delimiter === 'string' ? delimiter : '/';
}

KeePass.prototype.find = function(needle, node) {
    var parts = needle.split(this.delimiter),
        r, i, l;

    r = node;
    for (i = 0, l = parts.length ; i < l ; i++) {
        r = r.getChildren(parts[i]);
        if (r === null) {
            return null;
        }
    }

    return r;
};

// KeePass.prototype.findByUUID = function(uuid, node) {
//     if (node.uuid)
// };

module.exports = KeePass;
