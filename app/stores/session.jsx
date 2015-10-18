var sessionActions = require('../actions/session');

var sessionList = [];

var sessionStore = Reflux.createStore({

    listenables: sessionActions,

    onGetSuccess: function (returnedList) {
        console.debug('sessionStore#onGetSuccess', 'arguments:', arguments);
        sessionList = returnedList;
        this.trigger(sessionList);
    },

    onDeleteSuccess: function () {
        console.debug('sessionStore#onDeleteSuccess', 'arguments:', arguments);
    }

});

module.exports = sessionStore;
