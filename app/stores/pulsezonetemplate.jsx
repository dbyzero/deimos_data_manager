var pulsezonetemplateActions = require('../actions/pulsezonetemplate');

var pulsezonetemplateList = [];
var pulsezonetemplateListIndexedById = {};
var pulsezonetemplateListIndexedByName = {};

var pulsezonetemplateStore = Reflux.createStore({

    listenables: pulsezonetemplateActions,

    onGetSuccess: function (returnedList) {
        console.debug('pulsezonetemplateStore#onGetSuccess', 'arguments:', arguments);
        pulsezonetemplateList = returnedList;
        pulsezonetemplateListIndexedById = _.indexBy(returnedList, "id");
        pulsezonetemplateListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(pulsezonetemplateList);
    },

    onPostSuccess: function () {
        console.debug('pulsezonetemplateStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('pulsezonetemplateStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return pulsezonetemplateListIndexedById[id];
    },

    getByName: function (name) {
        return pulsezonetemplateListIndexedByName[name];
    }

});

module.exports = pulsezonetemplateStore;
