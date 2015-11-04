var env = require("../../env");

var skillActions = Reflux.createActions([
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

skillActions.get.listen(function () {
    console.debug('skillActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/skills',
        dataType: 'json',
        crossDomain: true,
        success: skillActions.getSuccess,
        error: skillActions.getFail
    });
});

skillActions.delete.listen(function (id) {
    console.debug('skillActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/skill/del/' + id,
        crossDomain: true,
        success: function () {
            skillActions.deleteSuccess(id);
        },
        error: function () {
            skillActions.deleteFail(id);
        }
    });
});

skillActions.post.listen(function (data) {
    console.debug('skillActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/skill/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            skillActions.postSuccess(data.id);
        },
        error: function () {
            skillActions.postFail(data.id);
        }
    });
});

skillActions.add.listen(function (data) {
    console.debug('skillActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/skill/create/' + data.login + '/' + data.password + '/' + data.mail,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            skillActions.addSuccess();
        },
        error: function () {
            skillActions.addFail();
        }
    });
});

/** Success callbacks **/

skillActions.getSuccess.listen(function () {
    console.debug('skillActions#getSuccess', 'arguments:', arguments);
});

skillActions.deleteSuccess.listen(function (id) {
    console.debug('skillActions#deleteSuccess', 'arguments:', arguments);
    skillActions.get();
});

skillActions.postSuccess.listen(function () {
    console.debug('skillActions#postSuccess', 'arguments:', arguments);
    skillActions.get();
});

skillActions.addSuccess.listen(function () {
    console.debug('skillActions#addSuccess', 'arguments:', arguments);
    skillActions.get();
});
/** Failed callbacks **/

skillActions.getFail.listen(function () {
    console.debug('skillActions#getFail', 'arguments:', arguments);
});

skillActions.deleteFail.listen(function (id) {
    console.debug('skillActions#deleteFail', 'arguments:', arguments);
});

skillActions.postFail.listen(function () {
    console.debug('skillActions#postFail', 'arguments:', arguments);
});

skillActions.addFail.listen(function () {
    console.debug('skillActions#addFail', 'arguments:', arguments);
});

module.exports = skillActions;
