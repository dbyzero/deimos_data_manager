var accountActions = require('../actions/account');
var accountStore = require('../stores/account');

var Account = React.createClass({

    mixins: [Reflux.connect(accountStore, "accountStore")],

    getInitialState: function () {
        return {
            accountStore: [],
            accountSelected: null
        };
    },

    componentWillMount: function () {
        accountActions.get();
    },

    render: function () {
        return (
            <div className="row">
                <h1>
                    Accounts&nbsp;
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editAccount" onClick={this.onCreateButtonClick}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </h1>
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Login</th>
                                <th>Password</th>
                                <th>Used by session</th>
                                <th>Mail</th>
                                <th>Actions</th>
                            </tr>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>
                {this.renderPopupDelete()}
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
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editAccount" data-id={dataRow.id} onClick={this.onActionButtonClick}>
                        <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                    </button>&nbsp;
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#deleteAccount" data-id={dataRow.id} onClick={this.onActionButtonClick}>
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
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
            <div className="modal fade" id="editAccount" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="exampleModalLabel">
                        {this.state.accountSelected ? "Edit" : "Create"} Account <strong>{this.state.accountSelected ? this.state.accountSelected.login : ""}</strong> {this.state.accountSelected ? "(ID:" + this.state.accountSelected.id + ")" : ""}
                    </h4>
                  </div>
                  <div className="modal-body">
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
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.unselectAccount}>Cancel</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editAccount}>Save</button>
                  </div>
                </div>
              </div>
            </div>
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
