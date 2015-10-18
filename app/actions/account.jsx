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
    "postFail"
]);

accountActions.get.listen(function () {
    console.debug('accountActions#get', 'arguments:', arguments);
    jQuery.ajax({
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
    jQuery.ajax({
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

accountActions.post.listen(function () {
    console.debug('accountActions#post', 'arguments:', arguments);
});

/** Success callbacks **/

accountActions.getSuccess.listen(function () {
    console.debug('accountActions#getSuccess', 'arguments:', arguments);
});

accountActions.deleteSuccess.listen(function (id) {
    console.debug('accountActions#deleteSuccess', 'arguments:', arguments);
    //refill accounts list
    accountActions.get();
});

accountActions.postSuccess.listen(function () {
    console.debug('accountActions#postSuccess', 'arguments:', arguments);
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

module.exports = accountActions;
