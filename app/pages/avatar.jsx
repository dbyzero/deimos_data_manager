var avatarActions = require('../actions/avatar');
var avatarStore = require('../stores/avatar');
var mixinJsonEditor = require('../mixins/mixinJsonEditor');

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

    mixins: [
        Reflux.connect(avatarStore, "avatarStore"),
        mixinJsonEditor
    ],

    getInitialState: function () {
        return {
            avatarStore: [],
            editPopupShown: false,
            deletePopupShown: false,
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
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup} bsSize="large">
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} avatar {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Row className="show-grid">
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Name" type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} data-form-attr="name"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Account" type="text" value={this.state.formData.account_name} onChange={this.onChangeFormValue} data-form-attr="account_name"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Skin" type="text" value={this.state.formData.skin} onChange={this.onChangeFormValue} data-form-attr="skin"/></Col>
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
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Jump Speed" type="text" value={this.state.formData.jump_speed} onChange={this.onChangeFormValue} data-form-attr="jump_speed"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Move Speed" type="text" value={this.state.formData.move_speed} onChange={this.onChangeFormValue} data-form-attr="move_speed"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" addonBefore="Mass" type="text" value={this.state.formData.mass} onChange={this.onChangeFormValue} data-form-attr="mass"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={6}><Input readOnly bsSize="small" addonBefore="Size" buttonAfter={createJsonEditButton("size")} onChange={this.onChangeFormValue} data-type="json" type="text" value={JSON.stringify(this.state.formData.size)}/></Col>
                        <Col xs={12} sm={6}><Input readOnly bsSize="small" addonBefore="Deltashow" buttonAfter={createJsonEditButton("deltashow")} onChange={this.onChangeFormValue} data-type="json" type="text" value={JSON.stringify(this.state.formData.deltashow)}/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Head" buttonAfter={createJsonEditButton("item_slot_head")} type="text" onChange={this.onChangeFormValue} value={JSON.stringify(this.state.formData.item_slot_head)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Head 2" buttonAfter={createJsonEditButton("item_slot_head2")} type="text" onChange={this.onChangeFormValue} value={JSON.stringify(this.state.formData.item_slot_head2)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Chest" buttonAfter={createJsonEditButton("item_slot_chest")} type="text" onChange={this.onChangeFormValue} value={JSON.stringify(this.state.formData.item_slot_chest)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Foot" buttonAfter={createJsonEditButton("item_slot_foot")} type="text"onChange={this.onChangeFormValue}  value={JSON.stringify(this.state.formData.item_slot_foot)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Left Hand" buttonAfter={createJsonEditButton("item_slot_left_hand")} type="text" onChange={this.onChangeFormValue} value={JSON.stringify(this.state.formData.item_slot_left_hand)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Right Hand" buttonAfter={createJsonEditButton("item_slot_right_hand")} type="text" onChange={this.onChangeFormValue} value={JSON.stringify(this.state.formData.item_slot_right_hand)}/></Col>
                        <Col xs={12} sm={12}><Input readOnly bsSize="small" addonBefore="Inventory" buttonAfter={createJsonEditButton("inventory")} type="text" onChange={this.onChangeFormValue} value={JSON.stringify(this.state.formData.inventory)}/></Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveAvatar} bsStyle="success">Save</Button>
                  </Modal.Footer>
                </Modal>

                {this.renderJsonPopup()}
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
                <td><div className="avatar-animation-run-right" style={{'background':'url(http://localhost:8000/spritesheet/avatar/'+dataRow.id+'.png)'}}></div></td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.showEditPopup} data-id={dataRow.id}><Glyphicon glyph="edit" /></Button>
                    <Button bsStyle="primary" onClick={this.showDeletePopup} data-id={dataRow.id}><Glyphicon glyph="trash" /></Button>
                  </ButtonToolbar>
              </td>
            </tr>
        );
    },

    //OVERRIDE BY MIXINS JSON EDITOR
    // onChangeFormValue: function (e) {
    // },

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
