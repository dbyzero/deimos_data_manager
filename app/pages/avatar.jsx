var avatarActions = require('../actions/avatar');
var avatarStore = require('../stores/avatar');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
// var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Account = React.createClass({

    mixins: [Reflux.connect(avatarStore, "avatarStore")],

    getInitialState: function () {
        return {
            avatarStore: [],
            editPopupShown: false,
            deletePopupShown: false,
            inventoryPopupShown: false,
            jsonEditorPopupShown: false,
            jsonEditor: null,
            jsonEditorFieldEdited: null,
            formIsNew: true,
            formData: {}
        };
    },

    componentWillMount: function () {
        avatarActions.get();
    },

    render: function () {
        var createJsonEditButton = function (field) {
            return <Button onClick={
                function () {
                    this.showJsonEditorPopup(field);
                }.bind(this)
            } bsStyle="primary">Edit</Button>;
        }.bind(this);
        return (
            <div>
                <h1>
                    Avatars&nbsp;
                    <Button bsStyle="primary" onClick={this.showAddPopup}><Glyphicon glyph="plus" /></Button>
                </h1>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Account</th>
                            <th>Stats</th>
                            <th>Skin</th>
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
                    <Modal.Title>Delete avatar {this.state.formData.name} (ID:{this.state.formData.id})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete avatar {this.state.formData.name} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteAvatar} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Popup */}
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} avatar {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className="show-grid">
                        <Col xs={12} sm={6}><Input bsSize="small" addonBefore="Login" type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} data-form-attr="name"/></Col>
                        <Col xs={12} sm={6}><Input bsSize="small" addonBefore="Account" type="text" value={this.state.formData.account_name} onChange={this.onChangeFormValue} data-form-attr="account_name"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={6}><Input bsSize="small" min="0" max="50" addonBefore="Strength" addonAfter={this.state.formData.strengh} type="range" value={this.state.formData.strengh} onChange={this.onChangeFormValue} data-form-attr="strengh"/></Col>
                        <Col xs={12} sm={6}><Input bsSize="small" min="0" max="50" addonBefore="Endurance" addonAfter={this.state.formData.endurance} type="range" value={this.state.formData.endurance} onChange={this.onChangeFormValue} data-form-attr="endurance"/></Col>
                        <Col xs={12} sm={6}><Input bsSize="small" min="0" max="50" addonBefore="Focus" addonAfter={this.state.formData.focus} type="range" value={this.state.formData.focus} onChange={this.onChangeFormValue} data-form-attr="focus"/></Col>
                        <Col xs={12} sm={6}><Input bsSize="small" min="0" max="50" addonBefore="Willpower" addonAfter={this.state.formData.willpower} type="range" value={this.state.formData.willpower} onChange={this.onChangeFormValue} data-form-attr="willpower"/></Col>
                        <Col xs={12} sm={6}><Input bsSize="small" min="0" max="50" addonBefore="Training" addonAfter={this.state.formData.training} type="range" value={this.state.formData.training} onChange={this.onChangeFormValue} data-form-attr="training"/></Col>
                        <Col xs={12} sm={6}><Input bsSize="small" addonBefore="Color" addonAfter={this.state.formData.rgba} type="color" value={this.state.formData.rgba} onChange={this.onChangeFormValue} data-form-attr="rgba"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Jump Speed" type="text" value={this.state.formData.jump_speed} onChange={this.onChangeFormValue}/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Move Speed" type="text" value={this.state.formData.move_speed} onChange={this.onChangeFormValue}/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Mass" type="text" value={this.state.formData.mass} onChange={this.onChangeFormValue} data-form-attr="mass"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={6}><Input readOnly bsSize="small" addonBefore="Size" buttonAfter={createJsonEditButton("size")} data-type="json" type="text" value={JSON.stringify(this.state.formData.size)}/></Col>
                        <Col xs={12} sm={6}><Input readOnly bsSize="small" addonBefore="Deltashow" buttonAfter={createJsonEditButton("deltashow")} data-type="json" type="text" value={JSON.stringify(this.state.formData.deltashow)}/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Head" buttonAfter={createJsonEditButton("item_slot_head")} type="text" value={JSON.stringify(this.state.formData.item_slot_head)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Head 2" buttonAfter={createJsonEditButton("item_slot_head2")} type="text" value={JSON.stringify(this.state.formData.item_slot_head2)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Chest" buttonAfter={createJsonEditButton("item_slot_chest")} type="text" value={JSON.stringify(this.state.formData.item_slot_chest)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Foot" buttonAfter={createJsonEditButton("item_slot_foot")} type="text" value={JSON.stringify(this.state.formData.item_slot_foot)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Left Hand" buttonAfter={createJsonEditButton("item_slot_left_hand")} type="text" value={JSON.stringify(this.state.formData.item_slot_left_hand)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Right Hand" buttonAfter={createJsonEditButton("item_slot_right_hand")} type="text" value={JSON.stringify(this.state.formData.item_slot_right_hand)}/></Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.showInventoryPopup} bsStyle="primary">Inventory</Button>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveAvatar}>Save</Button>
                  </Modal.Footer>
                </Modal>

                {/* Inventory Popup */}
                <Modal show={this.state.inventoryPopupShown} onHide={this.hideInventoryPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>Inventory of {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input bsSize="small" addonBefore="Inventory" data-type="json" type="textarea" value={JSON.stringify(this.state.formData.inventory)} onChange={this.onChangeFormValue} data-form-attr="inventory" />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideInventoryPopup} bsStyle="primary">Close</Button>
                  </Modal.Footer>
                </Modal>

                {/* Json Editor Popup */}
                <Modal show={this.state.jsonEditorPopupShown} onHide={this.hideJsonEditorPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>Json Editor</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div id="jsonEditorWorkspaceZone"></div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideJsonEditorPopup}>Cancel</Button>
                    <Button onClick={this.hideJsonEditorPopup} bsStyle="primary" onClick={this.saveJsonEditorData}>Save</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.avatarStore;
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
                <td>{dataRow.account_name}</td>
                <td>{dataRow.strengh}/{dataRow.endurance}/{dataRow.focus}/{dataRow.training}/{dataRow.willpower}</td>
                <td>#TODO SKIN</td>
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
        var fieldType = domField.dataset.type;
        switch (fieldType) {
        case "json" :
            newFormData[domField.dataset.formAttr] = JSON.parse(domField.value);
            break;
        default :
            newFormData[domField.dataset.formAttr] = domField.value;
        }
        this.setState({'formData': newFormData});
    },

    deleteAvatar: function () {
        avatarActions.delete(this.state.formData.id);
        this.hideDeletePopup();
    },

    saveAvatar: function () {
        if (this.state.formIsNew) {
            avatarActions.add(this.state.formData);
        } else {
            avatarActions.post(this.state.formData);
        }
        this.hideEditPopup();
    },

    resetFormValue: function () {
        this.setState({
            'formIsNew': true,
            'formData': {}
        });
    },

    showAddPopup: function () {
        this.setState({
            'editPopupShown': true,
            'fomrData': {},
            'formIsNew': true
        });
    },

    showEditPopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var avatarToEdit = avatarStore.getById(id);
        this.setState({
            'editPopupShown': true,
            'formData': _.clone(avatarToEdit),
            'formIsNew': false
        });
    },

    showDeletePopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var avatarToDelete = avatarStore.getById(id);
        this.setState({
            'deletePopupShown': true,
            'formData': _.clone(avatarToDelete)
        });
    },

    showInventoryPopup: function (e) {
        this.setState({
            'inventoryPopupShown': true
        });
    },

    showJsonEditorPopup: function (field) {
        this.setState({
            'jsonEditorPopupShown': true
        }, function () {
            this.setState({
                'jsonEditor': new JSONEditor(document.getElementById('jsonEditorWorkspaceZone')),
                'jsonEditorFieldEdited': field
            },
            function () {
                this.state.jsonEditor.set(this.state.formData[field] || {});
            });
        });
    },

    saveJsonEditorData: function () {
        var newValue = this.state.jsonEditor.get();
        var formData = this.state.formData;
        formData[this.state.jsonEditorFieldEdited] = newValue;
        this.setState({
            'jsonEditorPopupShown': false,
            'jsonEditor': null,
            'jsonEditorFieldEdited': null,
            'formData': formData
        });
    },

    hideInventoryPopup: function (e) {
        this.setState({
            'inventoryPopupShown': false
        });
    },

    hideJsonEditorPopup: function (e) {
        this.setState({
            'jsonEditorPopupShown': false
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