var routes = require('./routes');
var Router = ReactRouter;

module.exports = {
    init: function () {
        initRouter();
    }
};

var initRouter = function () {
    Router.run(routes, Router.HashLocation, function (Root) {
        React.render(<Root/>, document.body);
    });
};
