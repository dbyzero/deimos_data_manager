var skillActions = require('../actions/skill');

var skillList = [];
var skillListIndexedById = {};
var skillListIndexedByName = {};

var skillStore = Reflux.createStore({

    listenables: skillActions,

    onGetSuccess: function (returnedList) {
        console.debug('skillStore#onGetSuccess', 'arguments:', arguments);
        skillList = returnedList;
        skillListIndexedById = _.indexBy(returnedList, "id");
        skillListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(skillList);
    },

    onPostSuccess: function () {
        console.debug('skillStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('skillStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return skillListIndexedById[id];
    },

    getByName: function (name) {
        return skillListIndexedByName[name];
    }

});

module.exports = skillStore;
