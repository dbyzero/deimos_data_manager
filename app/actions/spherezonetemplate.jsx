var env = require("../../env");

var spherezonetemplateActions = Reflux.createActions([
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

spherezonetemplateActions.get.listen(function () {
    console.debug('spherezonetemplateActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/spherezonetemplates',
        dataType: 'json',
        crossDomain: true,
        success: spherezonetemplateActions.getSuccess,
        error: spherezonetemplateActions.getFail
    });
});

spherezonetemplateActions.delete.listen(function (id) {
    console.debug('spherezonetemplateActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/spherezonetemplate/' + id,
        crossDomain: true,
        success: function () {
            spherezonetemplateActions.deleteSuccess(id);
        },
        error: function () {
            spherezonetemplateActions.deleteFail(id);
        }
    });
});

spherezonetemplateActions.post.listen(function (data) {
    console.debug('spherezonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/spherezonetemplate/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            spherezonetemplateActions.postSuccess(data.id);
        },
        error: function () {
            spherezonetemplateActions.postFail(data.id);
        }
    });
});

spherezonetemplateActions.add.listen(function (data) {
    console.debug('spherezonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/spherezonetemplate/create/' + data.name,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            spherezonetemplateActions.addSuccess();
        },
        error: function () {
            spherezonetemplateActions.addFail();
        }
    });
});

/** Success callbacks **/

spherezonetemplateActions.getSuccess.listen(function () {
    console.debug('spherezonetemplateActions#getSuccess', 'arguments:', arguments);
});

spherezonetemplateActions.deleteSuccess.listen(function (id) {
    console.debug('spherezonetemplateActions#deleteSuccess', 'arguments:', arguments);
    spherezonetemplateActions.get();
});

spherezonetemplateActions.postSuccess.listen(function () {
    console.debug('spherezonetemplateActions#postSuccess', 'arguments:', arguments);
    spherezonetemplateActions.get();
});

spherezonetemplateActions.addSuccess.listen(function () {
    console.debug('spherezonetemplateActions#addSuccess', 'arguments:', arguments);
    spherezonetemplateActions.get();
});
/** Failed callbacks **/

spherezonetemplateActions.getFail.listen(function () {
    console.debug('spherezonetemplateActions#getFail', 'arguments:', arguments);
});

spherezonetemplateActions.deleteFail.listen(function (id) {
    console.debug('spherezonetemplateActions#deleteFail', 'arguments:', arguments);
});

spherezonetemplateActions.postFail.listen(function () {
    console.debug('spherezonetemplateActions#postFail', 'arguments:', arguments);
});

spherezonetemplateActions.addFail.listen(function () {
    console.debug('spherezonetemplateActions#addFail', 'arguments:', arguments);
});

module.exports = spherezonetemplateActions;
