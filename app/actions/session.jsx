var env = "../../env";
var sessionActions = Reflux.createActions([
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

sessionActions.get.listen(function () {
    console.debug('sessionActions#get', 'arguments:', arguments);
    jQuery.ajax({
        method: 'GET',
        url: env.apiURL + '/sessions',
        data: {},
        dataType: 'json',
        crossDomain: true,
        success: sessionActions.getSuccess,
        error: sessionActions.getFail
    });
});

sessionActions.delete.listen(function () {
    console.debug('sessionActions#delete', 'arguments:', arguments);
});

sessionActions.post.listen(function () {
    console.debug('sessionActions#post', 'arguments:', arguments);
});

/** Success callbacks **/

sessionActions.getSuccess.listen(function () {
    console.debug('sessionActions#getSuccess', 'arguments:', arguments);
});

sessionActions.deleteSuccess.listen(function () {
    console.debug('sessionActions#deleteSuccess', 'arguments:', arguments);
});

sessionActions.postSuccess.listen(function () {
    console.debug('sessionActions#postSuccess', 'arguments:', arguments);
});

/** Failed callbacks **/

sessionActions.getFail.listen(function () {
    console.debug('sessionActions#getFail', 'arguments:', arguments);
});

sessionActions.deleteFail.listen(function () {
    console.debug('sessionActions#deleteFail', 'arguments:', arguments);
});

sessionActions.postFail.listen(function () {
    console.debug('sessionActions#postFail', 'arguments:', arguments);
});

module.exports = sessionActions;
