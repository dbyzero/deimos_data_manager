var Session = React.createClass({
    render: function () {
        return (
            <div className="row">
                <h1>Sessions</h1>
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <tr>
                                <th>ID</th>
                                <th>IP</th>
                                <th>Account</th>
                                <th>Game Level</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                                <td>123564</td>
                                <td>201.215.45.32</td>
                                <td>dbyzero</td>
                                <td>Home Half</td>
                                <td>
                                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </td>
                            </tr>
                        </table>
                    </div>
            </div>
        );
    }
});

module.exports = Session;
