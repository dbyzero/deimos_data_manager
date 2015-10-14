var Route = ReactRouter.Route;

var Main = require('./pages/main');
var About = require('./pages/about');
var Sessions = require('./pages/session');

module.exports = (
    <Route handler={Main} path="/">
        <Route handler={Sessions} path="sessions"></Route>
        <Route handler={About} path="about"></Route>
    </Route>
);
