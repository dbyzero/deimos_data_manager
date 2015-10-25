var sessionActions = require('../actions/session');
var sessionStore = require('../stores/session');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

var Session = React.createClass({

    mixins: [Reflux.connect(sessionStore, "sessionStore")],

    getInitialState: function () {
        return {
            sessionStore: [],
            deletePopupShown: false,
            formIdValue: null
        };
    },

    componentWillMount: function () {
        sessionActions.get();
    },

    render: function () {
        return (
            <div className="row">
                <h1>Sessions</h1>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>IP</th>
                            <th>Account</th>
                            <th>Game Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
                <Modal show={this.state.deletePopupShown} onHide={this.hideDeletePopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete session {this.state.formIdValue}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete session {this.state.formIdValue} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteSession} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.sessionStore;
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
                    <td>{dataRow.ip}</td>
                    <td>{dataRow.account}</td>
                    <td>{dataRow.gamearea}</td>
                    <td>
                      <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.showDeletePopup} data-id={dataRow.id}><Glyphicon glyph="trash" /></Button>
                      </ButtonToolbar>
                    </td>
                </tr>
            );
    },

    deleteSession: function () {
        sessionActions.delete(this.state.formIdValue);
        this.hideDeletePopup();
    },

    resetFormValue: function () {
        this.setState({
            'formIdValue': null
        });
    },

    showDeletePopup: function (e) {
        var id = e.currentTarget.dataset.id;
        this.setState({
            'deletePopupShown': true,
            'formIdValue': id
        });
    },

    hideDeletePopup: function () {
        this.setState({'deletePopupShown': false});
        this.resetFormValue();
    }
});

module.exports = Session;
