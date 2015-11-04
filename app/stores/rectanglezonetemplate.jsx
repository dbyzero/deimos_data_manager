var rectanglezonetemplateActions = require('../actions/rectanglezonetemplate');

var rectanglezonetemplateList = [];
var rectanglezonetemplateListIndexedById = {};
var rectanglezonetemplateListIndexedByName = {};

var rectanglezonetemplateStore = Reflux.createStore({

    listenables: rectanglezonetemplateActions,

    onGetSuccess: function (returnedList) {
        console.debug('rectanglezonetemplateStore#onGetSuccess', 'arguments:', arguments);
        rectanglezonetemplateList = returnedList;
        rectanglezonetemplateListIndexedById = _.indexBy(returnedList, "id");
        rectanglezonetemplateListIndexedByName = _.indexBy(returnedList, "name");
        this.trigger(rectanglezonetemplateList);
    },

    onPostSuccess: function () {
        console.debug('rectanglezonetemplateStore#onPostSuccess', 'arguments:', arguments);
    },

    onDeleteSuccess: function () {
        console.debug('rectanglezonetemplateStore#onDeleteSuccess', 'arguments:', arguments);
    },

    getById: function (id) {
        return rectanglezonetemplateListIndexedById[id];
    },

    getByName: function (name) {
        return rectanglezonetemplateListIndexedByName[name];
    }

});

module.exports = rectanglezonetemplateStore;
