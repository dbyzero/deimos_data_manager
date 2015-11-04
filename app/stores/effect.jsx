var effectActions = require('../actions/effect');

var effectList = [];
var effectListIndexedById = {};
var effectListIndexedByName = {};

var effectStore = Reflux.createStore({

    listenables: effectActions,

    onGetSuccess: function (returnedList) {
        console.debug('effectStore#onGetSuccess', 'arguments:', arguments);
        effectList = returnedList;
        effectListIndexedById = _.indexBy(returnedList, "id");
        effectListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(effectList);
    },

    onPostSuccess: function () {
        console.debug('effectStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('effectStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return effectListIndexedById[id];
    },

    getByName: function (name) {
        return effectListIndexedByName[name];
    }

});

module.exports = effectStore;
