var NavBar = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#/">Home</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="/#/sessions">Sessions</a></li>
                            <li><a href="/#/accounts">Accounts</a></li>
                            <li><a href="/#/avatars">Avatars</a></li>
                            <li><a href="/#/gamelevels">GameLevels</a></li>
                            <li><a href="/#/skills">Skills</a></li>
                            <li><a href="/#/effects">Effects</a></li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Templates <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/#/monstertemplates">Monster Templates</a></li>
                                    <li><a href="/#/pettemplates">Pet Templates</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="/#/itemtemplates">Item Templates</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="/#/pulsezonetemplates">PulseZone templates</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="/#/aurazonetemplates">AuraZone templates</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="/#/rectanglezonetemplates">RectangleZone templates</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = NavBar;
