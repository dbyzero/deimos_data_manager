var accountActions = require('../actions/account');
var accountStore = require('../stores/account');

var Account = React.createClass({

    mixins: [Reflux.connect(accountStore, "accountStore")],

    getInitialState: function () {
        return {
            accountStore: []
        };
    },

    componentWillMount: function () {
        accountActions.get();
    },

    render: function () {
        return (
            <div className="row">
                <h1>Accounts</h1>
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
                            {renderRows(this.state.accountStore)}
                        </tbody>
                    </table>
                </div>
                {renderPopupDelete()}
            </div>
        );
    }
});

var renderRows = function (dataRows) {
    var rows = [];
    for (var i = 0; i < dataRows.length; i++) {
        rows.push(renderRow(dataRows[i]));
    }
    return rows;
};

var renderRow = function (dataRow) {
    return (
        <tr key={dataRow.id}>
            <td>{dataRow.id}</td>
            <td>{dataRow.login}</td>
            <td>{dataRow.password}</td>
            <td>{dataRow.usedBySession}</td>
            <td>{dataRow.mail}</td>
            <td>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#deleteAccount" data-id={dataRow.id} onClick={fillDeletePopup}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
            </td>
        </tr>
    );
};

/**
 *  Popup toggling is managed by bootstrap with element class name
 */
var renderPopupDelete = function () {
    return (
        <div className="modal fade" id="deleteAccount" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="exampleModalLabel">Delete Account <span id="modalPopupDelelteAccountId"></span></h4>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={deleteAccount}>Yes</button>
              </div>
            </div>
          </div>
        </div>
    );
};

var fillDeletePopup = function (event) {
    jQuery("#modalPopupDelelteAccountId").text(event.currentTarget.dataset.id);
};

var deleteAccount = function (event) {
    accountActions.delete(jQuery("#modalPopupDelelteAccountId").text());
};
module.exports = Account;
