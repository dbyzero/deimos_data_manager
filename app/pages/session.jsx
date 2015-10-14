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
        <tr>
            <td>{dataRow.id}</td>
            <td>{dataRow.ip}</td>
            <td>{dataRow.account}</td>
            <td>{dataRow.gamearea}</td>
            <td>
                <a href="javascript: void(0)" data-id={dataRow.id}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true">
                    </span>
                </a>
                &nbsp;
                <a href="javascript: void(0)" data-id={dataRow.id}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true">
                    </span>
                </a>
            </td>
        </tr>
    );
};

module.exports = Session;
