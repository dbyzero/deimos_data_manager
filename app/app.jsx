var NavBar = require('./components/navbar');
var About = require('./pages/about');
var Sessions = require('./pages/sessions');

var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function () {
        return (
            <div id="container" className="sandstone container">
                <NavBar/>
                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route handler={App} path="/">
        <Route handler={Sessions} path="sessions"></Route>
        <Route handler={About} path="about"></Route>
    </Route>
);

module.exports = {
    init: function () {
        Router.run(routes, Router.HashLocation, (Root) => {
            React.render(<Root/>, document.body);
        });
    }
};
