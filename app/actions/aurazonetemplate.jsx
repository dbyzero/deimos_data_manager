var env = require("../../env");

var aurazonetemplateActions = Reflux.createActions([
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

aurazonetemplateActions.get.listen(function () {
    console.debug('aurazonetemplateActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/aurazonetemplates',
        dataType: 'json',
        crossDomain: true,
        success: aurazonetemplateActions.getSuccess,
        error: aurazonetemplateActions.getFail
    });
});

aurazonetemplateActions.delete.listen(function (id) {
    console.debug('aurazonetemplateActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/aurazonetemplate/del/' + id,
        crossDomain: true,
        success: function () {
            aurazonetemplateActions.deleteSuccess(id);
        },
        error: function () {
            aurazonetemplateActions.deleteFail(id);
        }
    });
});

aurazonetemplateActions.post.listen(function (data) {
    console.debug('aurazonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/aurazonetemplate/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            aurazonetemplateActions.postSuccess(data.id);
        },
        error: function () {
            aurazonetemplateActions.postFail(data.id);
        }
    });
});

aurazonetemplateActions.add.listen(function (data) {
    console.debug('aurazonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/aurazonetemplate/create/' + data.login + '/' + data.password + '/' + data.mail,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            aurazonetemplateActions.addSuccess();
        },
        error: function () {
            aurazonetemplateActions.addFail();
        }
    });
});

/** Success callbacks **/

aurazonetemplateActions.getSuccess.listen(function () {
    console.debug('aurazonetemplateActions#getSuccess', 'arguments:', arguments);
});

aurazonetemplateActions.deleteSuccess.listen(function (id) {
    console.debug('aurazonetemplateActions#deleteSuccess', 'arguments:', arguments);
    aurazonetemplateActions.get();
});

aurazonetemplateActions.postSuccess.listen(function () {
    console.debug('aurazonetemplateActions#postSuccess', 'arguments:', arguments);
    aurazonetemplateActions.get();
});

aurazonetemplateActions.addSuccess.listen(function () {
    console.debug('aurazonetemplateActions#addSuccess', 'arguments:', arguments);
    aurazonetemplateActions.get();
});
/** Failed callbacks **/

aurazonetemplateActions.getFail.listen(function () {
    console.debug('aurazonetemplateActions#getFail', 'arguments:', arguments);
});

aurazonetemplateActions.deleteFail.listen(function (id) {
    console.debug('aurazonetemplateActions#deleteFail', 'arguments:', arguments);
});

aurazonetemplateActions.postFail.listen(function () {
    console.debug('aurazonetemplateActions#postFail', 'arguments:', arguments);
});

aurazonetemplateActions.addFail.listen(function () {
    console.debug('aurazonetemplateActions#addFail', 'arguments:', arguments);
});

module.exports = aurazonetemplateActions;
