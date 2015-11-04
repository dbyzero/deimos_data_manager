var env = require("../../env");

var monstertemplateActions = Reflux.createActions([
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

monstertemplateActions.get.listen(function () {
    console.debug('monstertemplateActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/monstertemplates',
        dataType: 'json',
        crossDomain: true,
        success: monstertemplateActions.getSuccess,
        error: monstertemplateActions.getFail
    });
});

monstertemplateActions.delete.listen(function (id) {
    console.debug('monstertemplateActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/monstertemplate/del/' + id,
        crossDomain: true,
        success: function () {
            monstertemplateActions.deleteSuccess(id);
        },
        error: function () {
            monstertemplateActions.deleteFail(id);
        }
    });
});

monstertemplateActions.post.listen(function (data) {
    console.debug('monstertemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/monstertemplate/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            monstertemplateActions.postSuccess(data.id);
        },
        error: function () {
            monstertemplateActions.postFail(data.id);
        }
    });
});

monstertemplateActions.add.listen(function (data) {
    console.debug('monstertemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/monstertemplate/create/' + data.login + '/' + data.password + '/' + data.mail,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            monstertemplateActions.addSuccess();
        },
        error: function () {
            monstertemplateActions.addFail();
        }
    });
});

/** Success callbacks **/

monstertemplateActions.getSuccess.listen(function () {
    console.debug('monstertemplateActions#getSuccess', 'arguments:', arguments);
});

monstertemplateActions.deleteSuccess.listen(function (id) {
    console.debug('monstertemplateActions#deleteSuccess', 'arguments:', arguments);
    monstertemplateActions.get();
});

monstertemplateActions.postSuccess.listen(function () {
    console.debug('monstertemplateActions#postSuccess', 'arguments:', arguments);
    monstertemplateActions.get();
});

monstertemplateActions.addSuccess.listen(function () {
    console.debug('monstertemplateActions#addSuccess', 'arguments:', arguments);
    monstertemplateActions.get();
});
/** Failed callbacks **/

monstertemplateActions.getFail.listen(function () {
    console.debug('monstertemplateActions#getFail', 'arguments:', arguments);
});

monstertemplateActions.deleteFail.listen(function (id) {
    console.debug('monstertemplateActions#deleteFail', 'arguments:', arguments);
});

monstertemplateActions.postFail.listen(function () {
    console.debug('monstertemplateActions#postFail', 'arguments:', arguments);
});

monstertemplateActions.addFail.listen(function () {
    console.debug('monstertemplateActions#addFail', 'arguments:', arguments);
});

module.exports = monstertemplateActions;
