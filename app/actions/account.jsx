var env = require("../../env");

var accountActions = Reflux.createActions([
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

accountActions.get.listen(function () {
    console.debug('accountActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/accounts',
        dataType: 'json',
        crossDomain: true,
        success: accountActions.getSuccess,
        error: accountActions.getFail
    });
});

accountActions.delete.listen(function (id) {
    console.debug('accountActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/account/del/' + id,
        crossDomain: true,
        success: function () {
            accountActions.deleteSuccess(id);
        },
        error: function () {
            accountActions.deleteFail(id);
        }
    });
});

accountActions.post.listen(function (data) {
    console.debug('accountActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/account/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            accountActions.postSuccess(data.id);
        },
        error: function () {
            accountActions.postFail(data.id);
        }
    });
});

accountActions.add.listen(function (data) {
    console.debug('accountActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/account/create/' + data.login + '/' + data.password + '/' + data.mail,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            accountActions.addSuccess();
        },
        error: function () {
            accountActions.addFail();
        }
    });
});

/** Success callbacks **/

accountActions.getSuccess.listen(function () {
    console.debug('accountActions#getSuccess', 'arguments:', arguments);
});

accountActions.deleteSuccess.listen(function (id) {
    console.debug('accountActions#deleteSuccess', 'arguments:', arguments);
    accountActions.get();
});

accountActions.postSuccess.listen(function () {
    console.debug('accountActions#postSuccess', 'arguments:', arguments);
    accountActions.get();
});

accountActions.addSuccess.listen(function () {
    console.debug('accountActions#addSuccess', 'arguments:', arguments);
    accountActions.get();
});
/** Failed callbacks **/

accountActions.getFail.listen(function () {
    console.debug('accountActions#getFail', 'arguments:', arguments);
});

accountActions.deleteFail.listen(function (id) {
    console.debug('accountActions#deleteFail', 'arguments:', arguments);
});

accountActions.postFail.listen(function () {
    console.debug('accountActions#postFail', 'arguments:', arguments);
});

accountActions.addFail.listen(function () {
    console.debug('accountActions#addFail', 'arguments:', arguments);
});

module.exports = accountActions;
