var sessionActions = require('../actions/session');
var sessionStore = require('../stores/session');

var Session = React.createClass({

    mixins: [Reflux.connect(sessionStore, "sessionStore")],

    getInitialState: function () {
        return {
            sessionStore: []
        };
    },

    componentWillMount: function () {
        sessionActions.get();
    },

    render: function () {
        return (
            <div className="row">
                <h1>Sessions</h1>
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>IP</th>
                                <th>Account</th>
                                <th>Game Level</th>
                                <th>Actions</th>
                            </tr>
                            {renderRows(this.state.sessionStore)}
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
            <td>{dataRow.ip}</td>
            <td>{dataRow.account}</td>
            <td>{dataRow.gamearea}</td>
            <td>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#deleteSession" data-id={dataRow.id} onClick={fillDeletePopup}>
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
        <div className="modal fade" id="deleteSession" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="exampleModalLabel">Delete Session <span id="modalPopupDelelteSessionId"></span></h4>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={deleteSession}>Yes</button>
              </div>
            </div>
          </div>
        </div>
    );
};

var fillDeletePopup = function (event) {
    jQuery("#modalPopupDelelteSessionId").text(event.currentTarget.dataset.id);
};

var deleteSession = function (event) {
    sessionActions.delete(jQuery("#modalPopupDelelteSessionId").text());
};
module.exports = Session;
