var accountActions = require('../actions/account');
var accountStore = require('../stores/account');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;

var Account = React.createClass({

    mixins: [Reflux.connect(accountStore, "accountStore")],

    getInitialState: function () {
        return {
            accountStore: [{
                id: 1,
                login: 'foobar',
                password: 'rototo',
                usedBySession: 'iudshfaoisdufhsdifh',
                mail: 'foor@bar.biz'
            }],
            accountSelected: null,
            editPopupShown: false
        };
    },

    showEditPopup: function () {
        this.setState({'editPopupShown': true});
    },

    hideEditPopup: function () {
        this.setState({'editPopupShown': false});
    },

    componentWillMount: function () {
        accountActions.get();
    },

    render: function () {
        return (
            <div>
                <h1>
                    Accounts&nbsp;
                    <Button bsStyle="primary"><Glyphicon glyph="plus" /></Button>
                </h1>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Login</th>
                            <th>Password</th>
                            <th>Used by session</th>
                            <th>Mail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
                {/*this.renderPopupDelete()*/}
                {this.renderPopupEdit()}
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.accountStore;
        var rows = [];
        for (var i = 0; i < dataRows.length; i++) {
            rows.push(this.renderRow(dataRows[i]));
        }
        return rows;
    },

    renderRow: function (dataRow) {
        return (
            <tr key={dataRow.id}>
                <td>{dataRow.id}</td>
                <td>{dataRow.login}</td>
                <td>{dataRow.password}</td>
                <td>{dataRow.usedBySession}</td>
                <td>{dataRow.mail}</td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.showEditPopup}><Glyphicon glyph="edit" /></Button>
                    <Button bsStyle="primary"><Glyphicon glyph="trash" /></Button>
                  </ButtonToolbar>
              </td>
            </tr>
        );
    },

    /**
     *  Popup toggling is managed by bootstrap with element class name
     */
    renderPopupDelete: function () {
        return (
            <div className="modal fade" id="deleteAccount" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="exampleModalLabel">
                        Delete Account <strong>{this.state.accountSelected ? this.state.accountSelected.login : ""}</strong> (ID:{this.state.accountSelected ? this.state.accountSelected.id : ""})
                    </h4>
                  </div>
                  <div className="modal-body">
                      <input type="hidden" value={this.state.accountSelected ? this.state.accountSelected.id : ""} id="deleteAccountID"/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.unselectAccount}>No</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteAccount}>Yes</button>
                  </div>
                </div>
              </div>
            </div>
        );
    },

    /**
     *  Popup toggling is managed by bootstrap with element class name
     */
    renderPopupEdit: function () {
        return (
            <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <input ref="formEditAccountId" value={this.state.accountSelected ? this.state.accountSelected.id : ""} id="formEditAccountId" type="hidden"/>
                  <div className="form-group">
                      <label htmlFor="formEditAccountLogin">Login</label>
                      <input ref="formEditAccountLogin" value={this.state.accountSelected ? this.state.accountSelected.login : ""} id="formEditAccountLogin" className="form-control" type="text"/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="formEditAccountPassword">Password</label>
                      <input ref="formEditAccountPassword" value={this.state.accountSelected ? this.state.accountSelected.password : ""} id="formEditAccountPassword" className="form-control" type="text"/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="formEditAccountEmail">Email</label>
                      <input ref="formEditAccountEmail" value={this.state.accountSelected ? this.state.accountSelected.mail : ""} id="formEditAccountEmail" className="form-control" type="email"/>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.hideEditPopup}>Cancel</Button>
                <Button onClick={this.editAccount}>Save</Button>
              </Modal.Footer>
            </Modal>
        );
    },

    unselectAccount: function () {
        this.setState({"accountSelected": null});
    },

    onActionButtonClick: function (e) {
        var selectedAccountId = parseInt(e.currentTarget.dataset.id);

        //get selected avatar
        var selectedAccount = this.state.accountStore.reduce(
            function (returnedAccount, rowValue, idx, arr) {
                if (rowValue.id === selectedAccountId) {
                    returnedAccount = rowValue;
                }
                return returnedAccount;
            }
        );
        this.setState({"accountSelected": selectedAccount});
        console.log(this.state.accountSelected);
    },

    deleteAccount: function () {
        accountActions.delete(this.state.accountSelected.id);
    },

    editAccount: function () {
        var data = {
            id: this.refs.formEditAccountId.getDOMNode().value,
            login: this.refs.formEditAccountLogin.getDOMNode().value,
            mail: this.refs.formEditAccountEmail.getDOMNode().value,
            password: this.refs.formEditAccountPassword.getDOMNode().value
        };
        accountActions.post(data);
    }
});

module.exports = Account;
