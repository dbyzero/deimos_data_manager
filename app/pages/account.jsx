var accountActions = require('../actions/account');
var accountStore = require('../stores/account');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

var Account = React.createClass({

    mixins: [Reflux.connect(accountStore, "accountStore")],

    getInitialState: function () {
        return {
            accountStore: [],
            editPopupShown: false,
            deletePopupShown: false,
            formIdValue: null,
            formLoginValue: null,
            formPasswordValue: null,
            formEmailValue: null,
            formIsNew: false
        };
    },

    componentWillMount: function () {
        accountActions.get();
    },

    render: function () {
        return (
            <div>
                <h1>
                    Accounts&nbsp;
                    <Button bsStyle="primary" onClick={this.showAddPopup}><Glyphicon glyph="plus" /></Button>
                </h1>
                <Table striped hover>
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
                {/* Delete Popup */}
                <Modal show={this.state.deletePopupShown} onHide={this.hideDeletePopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete account {this.state.formLoginValue} (ID:{this.state.formIdValue})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete account {this.state.formLoginValue} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteAccount} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Popup */}
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} account {this.state.formLoginValue} (ID:{this.state.formIdValue || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input type="text" value={this.state.formLoginValue} onChange={this.onChangeFormValue} label="Login" data-form-attr="formLoginValue"/>
                    <Input type="text" value={this.state.formEmailValue} onChange={this.onChangeFormValue} label="Email" data-form-attr="formEmailValue"/>
                    <Input type="text" value={this.state.formPasswordValue} onChange={this.onChangeFormValue} label="Password" data-form-attr="formPasswordValue"/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveAccount}>Save</Button>
                  </Modal.Footer>
                </Modal>
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
                    <Button bsStyle="primary" onClick={this.showEditPopup} data-id={dataRow.id}><Glyphicon glyph="edit" /></Button>
                    <Button bsStyle="primary" onClick={this.showDeletePopup} data-id={dataRow.id}><Glyphicon glyph="trash" /></Button>
                  </ButtonToolbar>
              </td>
            </tr>
        );
    },

    onChangeFormValue: function (e) {
        var domField = e.currentTarget;
        var newStatus = {};
        newStatus[domField.dataset.formAttr] = domField.value;
        this.setState(newStatus);
    },

    deleteAccount: function () {
        accountActions.delete(this.state.formIdValue);
        this.hideDeletePopup();
    },

    saveAccount: function () {
        var data = {
            id: this.state.formIdValue,
            login: this.state.formLoginValue,
            mail: this.state.formEmailValue,
            password: this.state.formPasswordValue
        };

        if (this.state.formIsNew) {
            accountActions.add(data);
        } else {
            accountActions.post(data);
        }
        this.hideEditPopup();
    },

    resetFormValue: function () {
        this.setState({
            'formIdValue': null,
            'formLoginValue': null,
            'formPasswordValue': null,
            'formEmailValue': null,
            'formIsNew': true
        });
    },

    showAddPopup: function () {
        this.setState({
            'editPopupShown': true,
            'formIdValue': null,
            'formLoginValue': null,
            'formPasswordValue': null,
            'formEmailValue': null,
            'formIsNew': true
        });
    },

    showEditPopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var accountToEdit = accountStore.getById(id);
        this.setState({
            'editPopupShown': true,
            'formIdValue': id,
            'formLoginValue': accountToEdit.login,
            'formPasswordValue': accountToEdit.password,
            'formEmailValue': accountToEdit.mail,
            'formIsNew': false
        });
    },

    showDeletePopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var accountToDelete = accountStore.getById(id);
        this.setState({
            'deletePopupShown': true,
            'formIdValue': id,
            'formLoginValue': accountToDelete.login,
            'formPasswordValue': accountToDelete.password,
            'formEmailValue': accountToDelete.mail
        });
    },

    hideEditPopup: function () {
        this.setState({'editPopupShown': false});
        this.resetFormValue();
    },

    hideDeletePopup: function () {
        this.setState({'deletePopupShown': false});
        this.resetFormValue();
    }
});

module.exports = Account;
