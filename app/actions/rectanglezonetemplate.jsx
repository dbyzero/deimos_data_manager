var env = require("../../env");

var rectanglezonetemplateActions = Reflux.createActions([
    "get",
    "getSuccess",
    "getFail",
    "delete",
    "deleteSuccess",
    "deleteFail",
    "post",
    "postSuccess",
    "postFail",
    "add",
    "addSuccess",
    "addFail"
]);

rectanglezonetemplateActions.get.listen(function () {
    console.debug('rectanglezonetemplateActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/rectanglezonetemplates',
        dataType: 'json',
        crossDomain: true,
        success: rectanglezonetemplateActions.getSuccess,
        error: rectanglezonetemplateActions.getFail
    });
});

rectanglezonetemplateActions.delete.listen(function (id) {
    console.debug('rectanglezonetemplateActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/rectanglezonetemplate/' + id,
        crossDomain: true,
        success: function () {
            rectanglezonetemplateActions.deleteSuccess(id);
        },
        error: function () {
            rectanglezonetemplateActions.deleteFail(id);
        }
    });
});

rectanglezonetemplateActions.post.listen(function (data) {
    console.debug('rectanglezonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/rectanglezonetemplate/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            rectanglezonetemplateActions.postSuccess(data.id);
        },
        error: function () {
            rectanglezonetemplateActions.postFail(data.id);
        }
    });
});

rectanglezonetemplateActions.add.listen(function (data) {
    console.debug('rectanglezonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/rectanglezonetemplate/create/' + data.name,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            rectanglezonetemplateActions.addSuccess();
        },
        error: function () {
            rectanglezonetemplateActions.addFail();
        }
    });
});

/** Success callbacks **/

rectanglezonetemplateActions.getSuccess.listen(function () {
    console.debug('rectanglezonetemplateActions#getSuccess', 'arguments:', arguments);
});

rectanglezonetemplateActions.deleteSuccess.listen(function (id) {
    console.debug('rectanglezonetemplateActions#deleteSuccess', 'arguments:', arguments);
    rectanglezonetemplateActions.get();
});

rectanglezonetemplateActions.postSuccess.listen(function () {
    console.debug('rectanglezonetemplateActions#postSuccess', 'arguments:', arguments);
    rectanglezonetemplateActions.get();
});

rectanglezonetemplateActions.addSuccess.listen(function () {
    console.debug('rectanglezonetemplateActions#addSuccess', 'arguments:', arguments);
    rectanglezonetemplateActions.get();
});
/** Failed callbacks **/

rectanglezonetemplateActions.getFail.listen(function () {
    console.debug('rectanglezonetemplateActions#getFail', 'arguments:', arguments);
});

rectanglezonetemplateActions.deleteFail.listen(function (id) {
    console.debug('rectanglezonetemplateActions#deleteFail', 'arguments:', arguments);
});

rectanglezonetemplateActions.postFail.listen(function () {
    console.debug('rectanglezonetemplateActions#postFail', 'arguments:', arguments);
});

rectanglezonetemplateActions.addFail.listen(function () {
    console.debug('rectanglezonetemplateActions#addFail', 'arguments:', arguments);
});

module.exports = rectanglezonetemplateActions;
