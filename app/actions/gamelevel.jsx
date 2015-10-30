var env = require("../../env");

var gamelevelActions = Reflux.createActions([
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

gamelevelActions.get.listen(function () {
    console.debug('gamelevelActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/gameareas',
        dataType: 'json',
        crossDomain: true,
        success: gamelevelActions.getSuccess,
        error: gamelevelActions.getFail
    });
});

gamelevelActions.delete.listen(function (id) {
    console.debug('gamelevelActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/gamearea/' + id,
        crossDomain: true,
        success: function () {
            gamelevelActions.deleteSuccess(id);
        },
        error: function () {
            gamelevelActions.deleteFail(id);
        }
    });
});

gamelevelActions.post.listen(function (data) {
    console.debug('gamelevelActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/gamearea/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            gamelevelActions.postSuccess(data.id);
        },
        error: function () {
            gamelevelActions.postFail(data.id);
        }
    });
});

gamelevelActions.add.listen(function (data) {
    console.debug('gamelevelActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/gamearea/create/'+data.name,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            gamelevelActions.addSuccess();
        },
        error: function () {
            gamelevelActions.addFail();
        }
    });
});

/** Success callbacks **/

gamelevelActions.getSuccess.listen(function () {
    console.debug('gamelevelActions#getSuccess', 'arguments:', arguments);
});

gamelevelActions.deleteSuccess.listen(function (id) {
    console.debug('gamelevelActions#deleteSuccess', 'arguments:', arguments);
    gamelevelActions.get();
});

gamelevelActions.postSuccess.listen(function () {
    console.debug('gamelevelActions#postSuccess', 'arguments:', arguments);
    gamelevelActions.get();
});

gamelevelActions.addSuccess.listen(function () {
    console.debug('gamelevelActions#addSuccess', 'arguments:', arguments);
    gamelevelActions.get();
});

/** Failed callbacks **/
gamelevelActions.getFail.listen(function () {
    console.debug('gamelevelActions#getFail', 'arguments:', arguments);
});

gamelevelActions.deleteFail.listen(function (id) {
    console.debug('gamelevelActions#deleteFail', 'arguments:', arguments);
});

gamelevelActions.postFail.listen(function () {
    console.debug('gamelevelActions#postFail', 'arguments:', arguments);
});

gamelevelActions.addFail.listen(function () {
    console.debug('gamelevelActions#addFail', 'arguments:', arguments);
});

module.exports = gamelevelActions;
