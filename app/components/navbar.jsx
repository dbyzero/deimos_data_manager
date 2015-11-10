var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var NavBrand = ReactBootstrap.NavBrand;
var NavDropdown = ReactBootstrap.NavDropdown;
var MenuItem = ReactBootstrap.MenuItem;

var NavBarComponent = React.createClass({
    render: function () {
        return (
          <Navbar toggleNavKey={0}>
            <NavBrand>Puck</NavBrand>
            <Nav eventKey={0}>
              <NavItem eventKey={1} href="/#/sessions">Sessions</NavItem>
              <NavItem eventKey={2} href="/#/accounts">Accounts</NavItem>
              <NavItem eventKey={3} href="/#/avatars">Avatars</NavItem>
              <NavItem eventKey={4} href="/#/gamelevels">GameLevels</NavItem>
              <NavItem eventKey={5} href="/#/skills">Skills</NavItem>
              <NavItem eventKey={6} href="/#/effects">Effects</NavItem>
              <NavDropdown eventKey={7} title="Templates" id="basic-nav-dropdown">
                <MenuItem eventKey="1" href="/#/templates/monster">Monster Templates</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2" href="/#/templates/item">Item Templates</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="3" href="/#/templates/rectanglezone">RectangleZone templates</MenuItem>
                <MenuItem eventKey="4" href="/#/templates/spherezone">SphereZone templates</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>
        );
    }
});

module.exports = NavBarComponent;
