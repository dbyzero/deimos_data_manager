var itemtemplateActions = require('../actions/itemtemplate');
var itemtemplateStore = require('../stores/itemtemplate');
var mixinJsonEditor = require('../mixins/mixinJsonEditor');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

var Items = React.createClass({

    mixins: [
        Reflux.connect(itemtemplateStore, "itemtemplateStore"),
        mixinJsonEditor
    ],

    getInitialState: function () {
        return {
            itemtemplateStore: [],
            editPopupShown: false,
            deletePopupShown: false,
            formData: {}
        };
    },

    componentWillMount: function () {
        itemtemplateActions.get();
    },

    render: function () {
        return (
            <div>
                <h1>
                    Item Templates&nbsp;
                    <Button bsStyle="primary" onClick={this.showAddPopup}><Glyphicon glyph="plus" /></Button>
                </h1>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Skin</th>
                            <th>Slot</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </Table>
                {/* Delete Popup */}
                <Modal show={this.state.deletePopupShown} onHide={this.hideDeletePopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete itemtemplate {this.state.formData.name} (ID:{this.state.formData.id})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete itemtemplate {this.state.formData.name} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteItems} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Popup */}
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} itemtemplate {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} label="Name" data-form-attr="name"/>
                    <Input type="text" value={this.state.formData.skin} onChange={this.onChangeFormValue} label="Skin" data-form-attr="skin"/>
                    <Input type="text" value={this.state.formData.slot} onChange={this.onChangeFormValue} label="Slot" data-form-attr="slot"/>
                    <Input type="text" onClick={function () {
                        this.showJsonEditorPopup('skills');
                    }.bind(this)} readOnly value={JSON.stringify(this.state.formData.skills)} data-type="json" onChange={this.onChangeFormValue} label="Skills" data-form-attr="skills"/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveItems}>Save</Button>
                  </Modal.Footer>
                </Modal>

                {this.renderJsonPopup()}
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.itemtemplateStore;
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
                <td>{dataRow.skin}</td>
                <td>{dataRow.slot}</td>
                <td>{JSON.stringify(dataRow.skills)}</td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.showEditPopup} data-id={dataRow.id}><Glyphicon glyph="edit" /></Button>
                    <Button bsStyle="primary" onClick={this.showDeletePopup} data-id={dataRow.id}><Glyphicon glyph="trash" /></Button>
                  </ButtonToolbar>
              </td>
            </tr>
        );
    },

    // OVERRIDE BY MIXINS
    // onChangeFormValue: function (e) {
    // },

    deleteItems: function () {
        itemtemplateActions.delete(this.state.formData.id);
        this.hideDeletePopup();
    },

    saveItems: function () {
        if (this.state.formIsNew) {
            itemtemplateActions.add(this.state.formData);
        } else {
            itemtemplateActions.post(this.state.formData);
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
        var itemtemplateToEdit = _.clone(itemtemplateStore.getById(id));
        this.setState({
            'editPopupShown': true,
            'formData': itemtemplateToEdit,
            'formIsNew': false
        });
    },

    showDeletePopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var itemtemplateToDelete = _.clone(itemtemplateStore.getById(id));
        this.setState({
            'deletePopupShown': true,
            'formData': itemtemplateToDelete
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

module.exports = Items;
