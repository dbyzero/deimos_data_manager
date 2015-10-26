var env = require("../../env");

var avatarActions = Reflux.createActions([
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

avatarActions.get.listen(function () {
    console.debug('avatarActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/avatars',
        dataType: 'json',
        crossDomain: true,
        success: avatarActions.getSuccess,
        error: avatarActions.getFail
    });
});

avatarActions.delete.listen(function (id) {
    console.debug('avatarActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/avatar/' + id,
        crossDomain: true,
        success: function () {
            avatarActions.deleteSuccess(id);
        },
        error: function () {
            avatarActions.deleteFail(id);
        }
    });
});

avatarActions.post.listen(function (data) {
    console.debug('avatarActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/avatar/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            avatarActions.postSuccess(data.id);
        },
        error: function () {
            avatarActions.postFail(data.id);
        }
    });
});

avatarActions.add.listen(function (data) {
    console.debug('avatarActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/avatar/create/' + data.accountName + '/' + data.name,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            avatarActions.addSuccess();
        },
        error: function () {
            avatarActions.addFail();
        }
    });
});

/** Success callbacks **/

avatarActions.getSuccess.listen(function () {
    console.debug('avatarActions#getSuccess', 'arguments:', arguments);
});

avatarActions.deleteSuccess.listen(function (id) {
    console.debug('avatarActions#deleteSuccess', 'arguments:', arguments);
    avatarActions.get();
});

avatarActions.postSuccess.listen(function () {
    console.debug('avatarActions#postSuccess', 'arguments:', arguments);
    avatarActions.get();
});

avatarActions.addSuccess.listen(function () {
    console.debug('avatarActions#addSuccess', 'arguments:', arguments);
    avatarActions.get();
});
/** Failed callbacks **/

avatarActions.getFail.listen(function () {
    console.debug('avatarActions#getFail', 'arguments:', arguments);
});

avatarActions.deleteFail.listen(function (id) {
    console.debug('avatarActions#deleteFail', 'arguments:', arguments);
});

avatarActions.postFail.listen(function () {
    console.debug('avatarActions#postFail', 'arguments:', arguments);
});

avatarActions.addFail.listen(function () {
    console.debug('avatarActions#addFail', 'arguments:', arguments);
});

module.exports = avatarActions;
