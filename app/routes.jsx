var Route = ReactRouter.Route;

var Main = require('./pages/main');
// var About = require('./pages/about');
var Sessions = require('./pages/session');
var Accounts = require('./pages/account');
var Avatars = require('./pages/avatar');
var Gamelevels = require('./pages/gamelevel');
var Skills = require('./pages/skill');
var Effects = require('./pages/effect');
var ItemTemplates = require('./pages/itemtemplate');
var MonsterTemplates = require('./pages/monstertemplate');
var RectangleZoneTemplates = require('./pages/rectanglezonetemplate');
var SphereZoneTemplates = require('./pages/spherezonetemplate');

module.exports = (
    <Route handler={Main} path="/">
        <Route handler={Sessions} path="sessions"></Route>
        <Route handler={Accounts} path="accounts"></Route>
        <Route handler={Avatars} path="avatars"></Route>
        <Route handler={Avatars} path="avatars"></Route>
        <Route handler={Gamelevels} path="gamelevels"></Route>
        <Route handler={Skills} path="skills"></Route>
        <Route handler={Effects} path="effects"></Route>
        <Route path="templates">
            <Route handler={ItemTemplates} path="item"></Route>
            <Route handler={MonsterTemplates} path="monster"></Route>
            <Route handler={RectangleZoneTemplates} path="rectanglezone"></Route>
            <Route handler={SphereZoneTemplates} path="spherezone"></Route>
        </Route>
    </Route>
);
