var effectActions = require('../actions/effect');
var effectStore = require('../stores/effect');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

var Effect = React.createClass({

    mixins: [Reflux.connect(effectStore, "effectStore")],

    getInitialState: function () {
        return {
            effectStore: [],
            editPopupShown: false,
            deletePopupShown: false,
            formData: {}
        };
    },

    componentWillMount: function () {
        effectActions.get();
    },

    render: function () {
        return (
            <div>
                <h1>
                    Effects&nbsp;
                    <Button bsStyle="primary" onClick={this.showAddPopup}><Glyphicon glyph="plus" /></Button>
                </h1>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
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
                    <Modal.Title>Delete effect {this.state.formData.name} (ID:{this.state.formData.id})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete effect {this.state.formData.name} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteEffect} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Popup */}
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} effect {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} label="Name" data-form-attr="formData.name"/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveEffect}>Save</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.effectStore;
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
                <td>{dataRow.name}</td>
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
        var newFormData = this.state.formData;
        newFormData[domField.dataset.formAttr] = domField.value;
        this.setState({'formData': newFormData});
    },

    deleteEffect: function () {
        effectActions.delete(this.state.formData.id);
        this.hideDeletePopup();
    },

    saveEffect: function () {
        if (this.state.formIsNew) {
            effectActions.add(this.formData);
        } else {
            effectActions.post(this.formData);
        }
        this.hideEditPopup();
    },

    resetFormValue: function () {
        this.setState({
            'formData': {}
        });
    },

    showAddPopup: function () {
        this.setState({
            'formIsNew': true,
            'editPopupShown': true,
            'formData': {}
        });
    },

    showEditPopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var effectToEdit = _.clone(effectStore.getById(id));
        this.setState({
            'editPopupShown': true,
            'formData': effectToEdit,
            'formIsNew': false
        });
    },

    showDeletePopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var effectToDelete = _.clone(effectStore.getById(id));
        this.setState({
            'deletePopupShown': true,
            'formData': effectToDelete
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

module.exports = Effect;
