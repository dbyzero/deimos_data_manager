var env = require("../../env");

var pettemplateActions = Reflux.createActions([
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

pettemplateActions.get.listen(function () {
    console.debug('pettemplateActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/pettemplates',
        dataType: 'json',
        crossDomain: true,
        success: pettemplateActions.getSuccess,
        error: pettemplateActions.getFail
    });
});

pettemplateActions.delete.listen(function (id) {
    console.debug('pettemplateActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/pettemplate/del/' + id,
        crossDomain: true,
        success: function () {
            pettemplateActions.deleteSuccess(id);
        },
        error: function () {
            pettemplateActions.deleteFail(id);
        }
    });
});

pettemplateActions.post.listen(function (data) {
    console.debug('pettemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/pettemplate/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            pettemplateActions.postSuccess(data.id);
        },
        error: function () {
            pettemplateActions.postFail(data.id);
        }
    });
});

pettemplateActions.add.listen(function (data) {
    console.debug('pettemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/pettemplate/create/' + data.login + '/' + data.password + '/' + data.mail,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            pettemplateActions.addSuccess();
        },
        error: function () {
            pettemplateActions.addFail();
        }
    });
});

/** Success callbacks **/

pettemplateActions.getSuccess.listen(function () {
    console.debug('pettemplateActions#getSuccess', 'arguments:', arguments);
});

pettemplateActions.deleteSuccess.listen(function (id) {
    console.debug('pettemplateActions#deleteSuccess', 'arguments:', arguments);
    pettemplateActions.get();
});

pettemplateActions.postSuccess.listen(function () {
    console.debug('pettemplateActions#postSuccess', 'arguments:', arguments);
    pettemplateActions.get();
});

pettemplateActions.addSuccess.listen(function () {
    console.debug('pettemplateActions#addSuccess', 'arguments:', arguments);
    pettemplateActions.get();
});
/** Failed callbacks **/

pettemplateActions.getFail.listen(function () {
    console.debug('pettemplateActions#getFail', 'arguments:', arguments);
});

pettemplateActions.deleteFail.listen(function (id) {
    console.debug('pettemplateActions#deleteFail', 'arguments:', arguments);
});

pettemplateActions.postFail.listen(function () {
    console.debug('pettemplateActions#postFail', 'arguments:', arguments);
});

pettemplateActions.addFail.listen(function () {
    console.debug('pettemplateActions#addFail', 'arguments:', arguments);
});

module.exports = pettemplateActions;
