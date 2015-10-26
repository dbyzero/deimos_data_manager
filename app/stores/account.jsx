var accountActions = require('../actions/account');

var accountList = [];
var accountListIndexedById = {};
var accountListIndexedByLogin = {};

var accountStore = Reflux.createStore({

    listenables: accountActions,

    onGetSuccess: function (returnedList) {
        console.debug('accountStore#onGetSuccess', 'arguments:', arguments);
        accountList = returnedList;
        accountListIndexedById = _.indexBy(returnedList, "id");
        accountListIndexedByLogin = _.indexBy(returnedList, "login");
        this.trigger(accountList);
    },

    onPostSuccess: function () {
        console.debug('accountStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('accountStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return accountListIndexedById[id];
    },

    getByLogin: function (login) {
        return accountListIndexedByLogin[login];
    }

});

module.exports = accountStore;
