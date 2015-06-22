/**
 * Created by Fidesio on 03/03/2015.
 */

function Node(uuid, name) {
    this.uuid = uuid;
    this.name = name;
    this.data = {};
    this.children = [];
}

/**
 * Only one level
 * @param name
 * @returns Node
 */
Node.prototype.getChildren = function(name) {
    var i, l, child;
    for (i = 0, l = this.children.length ; i < l ; i++) {
        child = this.children[i];

        if (child.name === name) {
            return child;
        }
    }

    return null;
};

Node.prototype.loadData = function(basicApi) {
    var data = basicApi.getEntries(this.uuid),
        stringToData = function(strings) {
            var data = {}, i, l;
            for (i = 0, l = strings.length ; i < l ; i++) {
                if (strings[i].Key === 'Title') {
                    data.title = strings[i].Value;
                } else if (strings[i].Key === 'URL') {
                    data.url = strings[i].Value;
                } else if (strings[i].Key === 'Password') {
                    data.password = strings[i].Value._;
                } else if (strings[i].Key === 'UserName') {
                    data.username = strings[i].Value;
                }
            }

            return data;
        }, i, l, r;

    for (i = 0, l = data.length ; i < l ; i++) {
       if (Array.isArray(data[i].String)) {
           r = stringToData(data[i].String);

           if (typeof r.title !== 'string') {
               throw new Error('TODO');
           }

           this.data[r.title] = r;
        }
    }
};

module.exports = Node;
