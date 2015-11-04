var env = require("../../env");

var pulsezonetemplateActions = Reflux.createActions([
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

pulsezonetemplateActions.get.listen(function () {
    console.debug('pulsezonetemplateActions#get', 'arguments:', arguments);
    $.ajax({
        method: 'GET',
        url: env.apiURL + '/pulsezonetemplates',
        dataType: 'json',
        crossDomain: true,
        success: pulsezonetemplateActions.getSuccess,
        error: pulsezonetemplateActions.getFail
    });
});

pulsezonetemplateActions.delete.listen(function (id) {
    console.debug('pulsezonetemplateActions#delete', 'arguments:', arguments);
    $.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/pulsezonetemplate/del/' + id,
        crossDomain: true,
        success: function () {
            pulsezonetemplateActions.deleteSuccess(id);
        },
        error: function () {
            pulsezonetemplateActions.deleteFail(id);
        }
    });
});

pulsezonetemplateActions.post.listen(function (data) {
    console.debug('pulsezonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/pulsezonetemplate/update/' + data.id,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            pulsezonetemplateActions.postSuccess(data.id);
        },
        error: function () {
            pulsezonetemplateActions.postFail(data.id);
        }
    });
});

pulsezonetemplateActions.add.listen(function (data) {
    console.debug('pulsezonetemplateActions#post', 'arguments:', arguments);
    $.ajax({
        method: 'POST',
        url: env.apiURL + '/pulsezonetemplate/create/' + data.login + '/' + data.password + '/' + data.mail,
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: function () {
            pulsezonetemplateActions.addSuccess();
        },
        error: function () {
            pulsezonetemplateActions.addFail();
        }
    });
});

/** Success callbacks **/

pulsezonetemplateActions.getSuccess.listen(function () {
    console.debug('pulsezonetemplateActions#getSuccess', 'arguments:', arguments);
});

pulsezonetemplateActions.deleteSuccess.listen(function (id) {
    console.debug('pulsezonetemplateActions#deleteSuccess', 'arguments:', arguments);
    pulsezonetemplateActions.get();
});

pulsezonetemplateActions.postSuccess.listen(function () {
    console.debug('pulsezonetemplateActions#postSuccess', 'arguments:', arguments);
    pulsezonetemplateActions.get();
});

pulsezonetemplateActions.addSuccess.listen(function () {
    console.debug('pulsezonetemplateActions#addSuccess', 'arguments:', arguments);
    pulsezonetemplateActions.get();
});
/** Failed callbacks **/

pulsezonetemplateActions.getFail.listen(function () {
    console.debug('pulsezonetemplateActions#getFail', 'arguments:', arguments);
});

pulsezonetemplateActions.deleteFail.listen(function (id) {
    console.debug('pulsezonetemplateActions#deleteFail', 'arguments:', arguments);
});

pulsezonetemplateActions.postFail.listen(function () {
    console.debug('pulsezonetemplateActions#postFail', 'arguments:', arguments);
});

pulsezonetemplateActions.addFail.listen(function () {
    console.debug('pulsezonetemplateActions#addFail', 'arguments:', arguments);
});

module.exports = pulsezonetemplateActions;
