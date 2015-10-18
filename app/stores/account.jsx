var accountActions = require('../actions/account');

var accountList = [];

var accountStore = Reflux.createStore({

    listenables: accountActions,

    onGetSuccess: function (returnedList) {
        console.debug('accountStore#onGetSuccess', 'arguments:', arguments);
        accountList = returnedList;
        this.trigger(accountList);
    },

    onPostSuccess: function () {
        console.debug('accountStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('accountStore#onDeleteSuccess', 'arguments:', arguments);
    }

});

module.exports = accountStore;
