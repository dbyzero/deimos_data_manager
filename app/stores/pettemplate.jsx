var pettemplateActions = require('../actions/pettemplate');

var pettemplateList = [];
var pettemplateListIndexedById = {};
var pettemplateListIndexedByName = {};

var pettemplateStore = Reflux.createStore({

    listenables: pettemplateActions,

    onGetSuccess: function (returnedList) {
        console.debug('pettemplateStore#onGetSuccess', 'arguments:', arguments);
        pettemplateList = returnedList;
        pettemplateListIndexedById = _.indexBy(returnedList, "id");
        pettemplateListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(pettemplateList);
    },

    onPostSuccess: function () {
        console.debug('pettemplateStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('pettemplateStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return pettemplateListIndexedById[id];
    },

    getByName: function (name) {
        return pettemplateListIndexedByName[name];
    }

});

module.exports = pettemplateStore;
