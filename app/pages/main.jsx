var NavBar = require('../components/navbar');
var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
    render: function () {
        return (
            <div id="container" className="sandstone container">
                <NavBar/>
                <RouteHandler/>
            </div>
        );
    }
});

module.exports = Main;
