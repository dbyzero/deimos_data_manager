var env = require("../../env");

var itemtemplateActions = Reflux.createActions([
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

itemtemplateActions.get.listen(function () {
    console.debug('itemtemplateActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/itemtemplates',
        dataType: 'json',
        crossDomain: true,
        success: itemtemplateActions.getSuccess,
        error: itemtemplateActions.getFail
    });
});

itemtemplateActions.delete.listen(function (id) {
    console.debug('itemtemplateActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/itemtemplate/del/' + id,
        crossDomain: true,
        success: function () {
            itemtemplateActions.deleteSuccess(id);
        },
        error: function () {
            itemtemplateActions.deleteFail(id);
        }
    });
});

itemtemplateActions.post.listen(function (data) {
    console.debug('itemtemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/itemtemplate/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            itemtemplateActions.postSuccess(data.id);
        },
        error: function () {
            itemtemplateActions.postFail(data.id);
        }
    });
});

itemtemplateActions.add.listen(function (data) {
    console.debug('itemtemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/itemtemplate/create/' + data.login + '/' + data.password + '/' + data.mail,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            itemtemplateActions.addSuccess();
        },
        error: function () {
            itemtemplateActions.addFail();
        }
    });
});

/** Success callbacks **/

itemtemplateActions.getSuccess.listen(function () {
    console.debug('itemtemplateActions#getSuccess', 'arguments:', arguments);
});

itemtemplateActions.deleteSuccess.listen(function (id) {
    console.debug('itemtemplateActions#deleteSuccess', 'arguments:', arguments);
    itemtemplateActions.get();
});

itemtemplateActions.postSuccess.listen(function () {
    console.debug('itemtemplateActions#postSuccess', 'arguments:', arguments);
    itemtemplateActions.get();
});

itemtemplateActions.addSuccess.listen(function () {
    console.debug('itemtemplateActions#addSuccess', 'arguments:', arguments);
    itemtemplateActions.get();
});
/** Failed callbacks **/

itemtemplateActions.getFail.listen(function () {
    console.debug('itemtemplateActions#getFail', 'arguments:', arguments);
});

itemtemplateActions.deleteFail.listen(function (id) {
    console.debug('itemtemplateActions#deleteFail', 'arguments:', arguments);
});

itemtemplateActions.postFail.listen(function () {
    console.debug('itemtemplateActions#postFail', 'arguments:', arguments);
});

itemtemplateActions.addFail.listen(function () {
    console.debug('itemtemplateActions#addFail', 'arguments:', arguments);
});

module.exports = itemtemplateActions;
