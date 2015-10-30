var gamelevelActions = require('../actions/gamelevel');

var gamelevelList = [];
var gamelevelListIndexedById = {};

var gamelevelStore = Reflux.createStore({

    listenables: gamelevelActions,

    onGetSuccess: function (returnedList) {
        console.debug('gamelevelStore#onGetSuccess', 'arguments:', arguments);
        gamelevelList = returnedList;
        gamelevelListIndexedById = _.indexBy(returnedList, "id");
        this.trigger(gamelevelList);
    },

    onPostSuccess: function () {
        console.debug('gamelevelStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('gamelevelStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return gamelevelListIndexedById[id];
    }

});

module.exports = gamelevelStore;
