var Route = ReactRouter.Route;

var Main = require('./pages/main');
var About = require('./pages/about');
var Sessions = require('./pages/session');
var Accounts = require('./pages/account');

module.exports = (
    <Route handler={Main} path="/">
        <Route handler={Sessions} path="sessions"></Route>
        <Route handler={Accounts} path="accounts"></Route>
        <Route handler={About} path="about"></Route>
    </Route>
);
