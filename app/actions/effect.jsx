var env = require("../../env");

var effectActions = Reflux.createActions([
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

effectActions.get.listen(function () {
    console.debug('effectActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/effects',
        dataType: 'json',
        crossDomain: true,
        success: effectActions.getSuccess,
        error: effectActions.getFail
    });
});

effectActions.delete.listen(function (id) {
    console.debug('effectActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/effect/del/' + id,
        crossDomain: true,
        success: function () {
            effectActions.deleteSuccess(id);
        },
        error: function () {
            effectActions.deleteFail(id);
        }
    });
});

effectActions.post.listen(function (data) {
    console.debug('effectActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/effect/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            effectActions.postSuccess(data.id);
        },
        error: function () {
            effectActions.postFail(data.id);
        }
    });
});

effectActions.add.listen(function (data) {
    console.debug('effectActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/effect/create/' + data.name,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            effectActions.addSuccess();
        },
        error: function () {
            effectActions.addFail();
        }
    });
});

/** Success callbacks **/

effectActions.getSuccess.listen(function () {
    console.debug('effectActions#getSuccess', 'arguments:', arguments);
});

effectActions.deleteSuccess.listen(function (id) {
    console.debug('effectActions#deleteSuccess', 'arguments:', arguments);
    effectActions.get();
});

effectActions.postSuccess.listen(function () {
    console.debug('effectActions#postSuccess', 'arguments:', arguments);
    effectActions.get();
});

effectActions.addSuccess.listen(function () {
    console.debug('effectActions#addSuccess', 'arguments:', arguments);
    effectActions.get();
});
/** Failed callbacks **/

effectActions.getFail.listen(function () {
    console.debug('effectActions#getFail', 'arguments:', arguments);
});

effectActions.deleteFail.listen(function (id) {
    console.debug('effectActions#deleteFail', 'arguments:', arguments);
});

effectActions.postFail.listen(function () {
    console.debug('effectActions#postFail', 'arguments:', arguments);
});

effectActions.addFail.listen(function () {
    console.debug('effectActions#addFail', 'arguments:', arguments);
});

module.exports = effectActions;
