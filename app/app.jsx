var routes = require('./routes');
var Router = ReactRouter;

module.exports = {
    init: function () {
        linkSpritesheet();
        linkCss();
        initRouter();
    }
};

var initRouter = function () {
    Router.run(routes, Router.HashLocation, function (Root) {
        React.render(<Root/>, document.getElementById('app'));
    });
};

var linkSpritesheet = function () {
    var domLink = document.createElement("link");
    domLink.rel = "stylesheet";
    domLink.href = "http://puck.dbyzero.com:8080/css/skills.css?v=2";
    document.head.appendChild(domLink);
};

var linkCss = function () {
};
