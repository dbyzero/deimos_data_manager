var itemtemplateActions = require('../actions/itemtemplate');

var itemtemplateList = [];
var itemtemplateListIndexedById = {};
var itemtemplateListIndexedByName = {};

var itemtemplateStore = Reflux.createStore({

    listenables: itemtemplateActions,

    onGetSuccess: function (returnedList) {
        console.debug('itemtemplateStore#onGetSuccess', 'arguments:', arguments);
        itemtemplateList = returnedList;
        itemtemplateListIndexedById = _.indexBy(returnedList, "id");
        itemtemplateListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(itemtemplateList);
    },

    onPostSuccess: function () {
        console.debug('itemtemplateStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('itemtemplateStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return itemtemplateListIndexedById[id];
    },

    getByName: function (name) {
        return itemtemplateListIndexedByName[name];
    }

});

module.exports = itemtemplateStore;
