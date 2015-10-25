var accountActions = require('../actions/account');

var accountList = [];
var accountListIndexedById = {};

var accountStore = Reflux.createStore({

    listenables: accountActions,

    onGetSuccess: function (returnedList) {
        console.debug('accountStore#onGetSuccess', 'arguments:', arguments);
        accountList = returnedList;
        accountListIndexedById = _.indexBy(returnedList, "id");
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
    }

});

module.exports = accountStore;
