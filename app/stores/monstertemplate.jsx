var monstertemplateActions = require('../actions/monstertemplate');

var monstertemplateList = [];
var monstertemplateListIndexedById = {};
var monstertemplateListIndexedByName = {};

var monstertemplateStore = Reflux.createStore({

    listenables: monstertemplateActions,

    onGetSuccess: function (returnedList) {
        console.debug('monstertemplateStore#onGetSuccess', 'arguments:', arguments);
        monstertemplateList = returnedList;
        monstertemplateListIndexedById = _.indexBy(returnedList, "id");
        monstertemplateListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(monstertemplateList);
    },

    onPostSuccess: function () {
        console.debug('monstertemplateStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('monstertemplateStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return monstertemplateListIndexedById[id];
    },

    getByName: function (name) {
        return monstertemplateListIndexedByName[name];
    }

});

module.exports = monstertemplateStore;
