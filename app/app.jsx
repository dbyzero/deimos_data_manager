var routes = require('./routes');
var env = require('./env');
var Router = ReactRouter;

module.exports = {
    init: function () {
        linkCss();
        initRouter();
    }
};

var initRouter = function () {
    Router.run(routes, Router.HashLocation, function (Root) {
        React.render(<Root/>, document.getElementById('app'));
    });
};

var linkCss = function () {
    //skills
    var domLink = document.createElement("link");
    domLink.rel = "stylesheet";
    domLink.href = env.assetURL + "/css/skills.css?v=2";
    document.head.appendChild(domLink);

    //avatar
    var domLink = document.createElement("link");
    domLink.rel = "stylesheet";
    domLink.href = env.assetURL + "/css/keyframes.css?v=2";
    document.head.appendChild(domLink);

    var domLink = document.createElement("link");
    domLink.rel = "stylesheet";
    domLink.href = env.assetURL + "/css/animations.css?v=2";
    document.head.appendChild(domLink);
};
