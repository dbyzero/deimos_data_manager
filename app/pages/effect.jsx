var effectActions = require('../actions/effect');
var effectStore = require('../stores/effect');
var mixinJsonEditor = require('../mixins/mixinJsonEditor');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Effect = React.createClass({

    mixins: [
        Reflux.connect(effectStore, "effectStore"),
        mixinJsonEditor
    ],

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
                            <th>Description</th>
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
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}  bsSize="large">
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} effect {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} label="Name" data-form-attr="name"/>
                    <Input type="text" value={this.state.formData.description} onChange={this.onChangeFormValue} label="Description" data-form-attr="description"/>
                    <Row className="show-grid">
                        <Col xs={12} sm={4}><Input bsSize="small" type="checkbox" data-type="checkbox" checked={this.state.formData.instant} onChange={this.onChangeFormValue} label="Instant effect" data-form-attr="instant"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" readOnly={this.state.formData.instant} addonBefore="Frequency" value={this.state.formData.frequency} onChange={this.onChangeFormValue} data-form-attr="frequency"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" readOnly={this.state.formData.instant} addonBefore="Duration" value={this.state.formData.duration} onChange={this.onChangeFormValue} data-form-attr="duration"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={4}><Input bsSize="small" type="checkbox" data-type="checkbox" checked={this.state.formData.affectFriendly} onChange={this.onChangeFormValue} label="Affect friendly" data-form-attr="affectFriendly"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="checkbox" data-type="checkbox" checked={this.state.formData.affectEnnemies} onChange={this.onChangeFormValue} label="Affect ennemies" data-form-attr="affectEnnemies"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="checkbox" data-type="checkbox" checked={this.state.formData.affectPets} onChange={this.onChangeFormValue} label="Affect pets" data-form-attr="affectPets"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={6}><Input bsSize="small" type="text" value={this.state.formData.damage} onChange={this.onChangeFormValue} label="Damage" data-form-attr="damage"/></Col>
                        <Col xs={12} sm={6}><Input bsSize="small" type="text" value={this.state.formData.damageType} onChange={this.onChangeFormValue} label="Damage type" data-form-attr="damageType"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={3}><Input bsSize="small" type="text" value={this.state.formData.bonusHP} onChange={this.onChangeFormValue} addonAfter="+ HP" data-form-attr="bonusHP"/></Col>
                        <Col xs={12} sm={3}><Input bsSize="small" type="text" value={this.state.formData.bonusRegenHP} onChange={this.onChangeFormValue} addonAfter="+ Regen HP" data-form-attr="bonusRegenHP"/></Col>
                        <Col xs={12} sm={3}><Input bsSize="small" type="text" value={this.state.formData.bonusWill} onChange={this.onChangeFormValue} addonAfter="+ Will" data-form-attr="bonusWill"/></Col>
                        <Col xs={12} sm={3}><Input bsSize="small" type="text" value={this.state.formData.bonusRegenWill} onChange={this.onChangeFormValue} addonAfter="+ Regen Will" data-form-attr="bonusRegenWill"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={2}><Input bsSize="small" type="text" value={this.state.formData.bonusStrengh} onChange={this.onChangeFormValue} addonAfter="+ Strength" data-form-attr="bonusStrengh"/></Col>
                        <Col xs={12} sm={3}><Input bsSize="small" type="text" value={this.state.formData.bonusEndurance} onChange={this.onChangeFormValue} addonAfter="+ Endurance" data-form-attr="bonusEndurance"/></Col>
                        <Col xs={12} sm={3}><Input bsSize="small" type="text" value={this.state.formData.bonusWillpower} onChange={this.onChangeFormValue} addonAfter="+ Willpower" data-form-attr="bonusWillpower"/></Col>
                        <Col xs={12} sm={2}><Input bsSize="small" type="text" value={this.state.formData.bonusFocus} onChange={this.onChangeFormValue} addonAfter="+ Focus" data-form-attr="bonusFocus"/></Col>
                        <Col xs={12} sm={2}><Input bsSize="small" type="text" value={this.state.formData.bonusTraining} onChange={this.onChangeFormValue} addonAfter="+ Training" data-form-attr="bonusTraining"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.bonusMass} onChange={this.onChangeFormValue} addonAfter="+ Mass" data-form-attr="bonusMass"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.bonusSpeed} onChange={this.onChangeFormValue} addonAfter="+ Speed" data-form-attr="bonusSpeed"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.bonusArmor} onChange={this.onChangeFormValue} addonAfter="+ Armor" data-form-attr="bonusArmor"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.bonusPercentSkillDamage} onChange={this.onChangeFormValue} addonAfter="+ Skill Damage %" data-form-attr="bonusPercentSkillDamage"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.bonusPercentMeleeDamage} onChange={this.onChangeFormValue} addonAfter="+ Melee Damage %" data-form-attr="bonusPercentMeleeDamage"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.bonusPercentStuffStats} onChange={this.onChangeFormValue} addonAfter="+ Stuff Stats %" data-form-attr="bonusPercentStuffStats"/></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.replyPercentDamage} onChange={this.onChangeFormValue} label="Reply % damage" data-form-attr="replyPercentDamage"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="text" value={this.state.formData.replyDamage} onChange={this.onChangeFormValue} label="Respond damage" data-form-attr="replyDamage"/></Col>
                        <Col xs={12} sm={4}><Input bsSize="small" type="checkbox" data-type="checkbox" checked={this.state.formData.replySkillEffect} onChange={this.onChangeFormValue} label="Reply Skill Effect" data-form-attr="replySkillEffect"/></Col>
                    </Row>
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
                <td>{dataRow.description}</td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.showEditPopup} data-id={dataRow.id}><Glyphicon glyph="edit" /></Button>
                    <Button bsStyle="primary" onClick={this.showDeletePopup} data-id={dataRow.id}><Glyphicon glyph="trash" /></Button>
                  </ButtonToolbar>
              </td>
            </tr>
        );
    },

    //OVERRIDE BY MIXIN
    // onChangeFormValue: function (e) {
    // },

    deleteEffect: function () {
        effectActions.delete(this.state.formData.id);
        this.hideDeletePopup();
    },

    saveEffect: function () {
        if (this.state.formIsNew) {
            effectActions.add(this.state.formData);
        } else {
            effectActions.post(this.state.formData);
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
