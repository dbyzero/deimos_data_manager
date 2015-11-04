var aurazonetemplateActions = require('../actions/aurazonetemplate');

var aurazonetemplateList = [];
var aurazonetemplateListIndexedById = {};
var aurazonetemplateListIndexedByName = {};

var aurazonetemplateStore = Reflux.createStore({

    listenables: aurazonetemplateActions,

    onGetSuccess: function (returnedList) {
        console.debug('aurazonetemplateStore#onGetSuccess', 'arguments:', arguments);
        aurazonetemplateList = returnedList;
        aurazonetemplateListIndexedById = _.indexBy(returnedList, "id");
        aurazonetemplateListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(aurazonetemplateList);
    },

    onPostSuccess: function () {
        console.debug('aurazonetemplateStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('aurazonetemplateStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return aurazonetemplateListIndexedById[id];
    },

    getByName: function (name) {
        return aurazonetemplateListIndexedByName[name];
    }

});

module.exports = aurazonetemplateStore;
