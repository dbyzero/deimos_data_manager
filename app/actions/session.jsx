var env = require("../../env");

var sessionActions = Reflux.createActions([
    "get",
    "getSuccess",
    "getFail",
    "delete",
    "deleteSuccess",
    "deleteFail"
]);

sessionActions.get.listen(function () {
    console.debug('sessionActions#get', 'arguments:', arguments);
    jQuery.ajax({
        method: 'GET',
        url: env.apiURL + '/sessions',
        dataType: 'json',
        crossDomain: true,
        success: sessionActions.getSuccess,
        error: sessionActions.getFail
    });
});

sessionActions.delete.listen(function (id) {
    console.debug('sessionActions#delete', 'arguments:', arguments);
    jQuery.ajax({
        contentType: 'text/plain',
        method: 'DELETE',
        url: env.apiURL + '/session/unregister/' + id,
        crossDomain: true,
        success: function () {
            sessionActions.deleteSuccess(id);
        },
        error: function () {
            sessionActions.deleteFail(id);
        }
    });
});

/** Success callbacks **/

sessionActions.getSuccess.listen(function () {
    console.debug('sessionActions#getSuccess', 'arguments:', arguments);
});

sessionActions.deleteSuccess.listen(function (id) {
    console.debug('sessionActions#deleteSuccess', 'arguments:', arguments);
    //refill sessions list
    sessionActions.get();
});

/** Failed callbacks **/

sessionActions.getFail.listen(function () {
    console.debug('sessionActions#getFail', 'arguments:', arguments);
});

sessionActions.deleteFail.listen(function (id) {
    console.debug('sessionActions#deleteFail', 'arguments:', arguments);
});

module.exports = sessionActions;
