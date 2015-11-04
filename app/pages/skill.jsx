var skillActions = require('../actions/skill');
var skillStore = require('../stores/skill');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

var Skill = React.createClass({

    mixins: [Reflux.connect(skillStore, "skillStore")],

    getInitialState: function () {
        return {
            skillStore: [],
            editPopupShown: false,
            deletePopupShown: false,
            formData: {}
        };
    },

    componentWillMount: function () {
        skillActions.get();
    },

    render: function () {
        return (
            <div>
                <h1>
                    Skills&nbsp;
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
                    <Modal.Title>Delete skill {this.state.formData.name} (ID:{this.state.formData.id})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete skill {this.state.formData.name} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteSkill} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Popup */}
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} skill {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} label="Name" data-form-attr="formData.name"/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveSkill}>Save</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.skillStore;
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

    deleteSkill: function () {
        skillActions.delete(this.state.formData.id);
        this.hideDeletePopup();
    },

    saveSkill: function () {
        if (this.state.formIsNew) {
            skillActions.add(this.formData);
        } else {
            skillActions.post(this.formData);
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
        var skillToEdit = _.clone(skillStore.getById(id));
        this.setState({
            'editPopupShown': true,
            'formData': skillToEdit,
            'formIsNew': false
        });
    },

    showDeletePopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var skillToDelete = _.clone(skillStore.getById(id));
        this.setState({
            'deletePopupShown': true,
            'formData': skillToDelete
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

module.exports = Skill;
