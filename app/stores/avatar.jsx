var avatarActions = require('../actions/avatar');

var avatarList = [];
var avatarListIndexedById = {};
var avatarListIndexedByName = {};
var avatarListIndexedByAccountName = {};

var avatarStore = Reflux.createStore({

    listenables: avatarActions,

    onGetSuccess: function (returnedList) {
        console.debug('avatarStore#onGetSuccess', 'arguments:', arguments);
        avatarList = returnedList;
        avatarListIndexedById = _.indexBy(returnedList, "id");
        avatarListIndexedByName = _.indexBy(returnedList, "name");
        avatarListIndexedByAccountName = _.indexBy(returnedList, "account_name");
        this.trigger(avatarList);
    },

    onPostSuccess: function () {
        console.debug('avatarStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('avatarStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return avatarListIndexedById[id];
    },

    getByName: function (login) {
        return avatarListIndexedByName[login];
    },

    getByAccountName: function (accountName) {
        return avatarListIndexedByAccountName[accountName];
    }

});

module.exports = avatarStore;
