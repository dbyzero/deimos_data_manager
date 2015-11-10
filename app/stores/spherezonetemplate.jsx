var spherezonetemplateActions = require('../actions/spherezonetemplate');

var spherezonetemplateList = [];
var spherezonetemplateListIndexedById = {};
var spherezonetemplateListIndexedByName = {};

var spherezonetemplateStore = Reflux.createStore({

    listenables: spherezonetemplateActions,

    onGetSuccess: function (returnedList) {
        console.debug('spherezonetemplateStore#onGetSuccess', 'arguments:', arguments);
        spherezonetemplateList = returnedList;
        spherezonetemplateListIndexedById = _.indexBy(returnedList, "id");
        spherezonetemplateListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(spherezonetemplateList);
    },

    onPostSuccess: function () {
        console.debug('spherezonetemplateStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('spherezonetemplateStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return spherezonetemplateListIndexedById[id];
    },

    getByName: function (name) {
        return spherezonetemplateListIndexedByName[name];
    }

});

module.exports = spherezonetemplateStore;
