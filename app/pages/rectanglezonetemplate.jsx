var rectanglezonetemplateActions = require('../actions/rectanglezonetemplate');
var rectanglezonetemplateStore = require('../stores/rectanglezonetemplate');
var mixinJsonEditor = require('../mixins/mixinJsonEditor');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

var RectangleZone = React.createClass({

    mixins: [
      Reflux.connect(rectanglezonetemplateStore, "rectanglezonetemplateStore"),
      mixinJsonEditor
    ],

    getInitialState: function () {
        return {
            rectanglezonetemplateStore: [],
            editPopupShown: false,
            deletePopupShown: false,
            formData: {}
        };
    },

    componentWillMount: function () {
        rectanglezonetemplateActions.get();
    },

    render: function () {
        return (
            <div>
                <h1>
                    Rectangle Zones&nbsp;
                    <Button bsStyle="primary" onClick={this.showAddPopup}><Glyphicon glyph="plus" /></Button>
                </h1>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
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
                    <Modal.Title>Delete rectanglezonetemplate {this.state.formData.name} (ID:{this.state.formData.id})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete rectanglezonetemplate {this.state.formData.name} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteRectangleZone} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Popup */}
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} rectanglezonetemplate {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} label="Name" data-form-attr="name"/>
                    <Input type="textarea" value={this.state.formData.description} onChange={this.onChangeFormValue} label="Description" data-form-attr="description"/>
                    <Input type="text" value={this.state.formData.duration} onChange={this.onChangeFormValue} addonBefore="Duration" data-form-attr="duration"/>
                    <Input type="text" value={this.state.formData.skin} onChange={this.onChangeFormValue} addonBefore="Skin" data-form-attr="skin"/>
                    <Input type="color" value={this.state.formData.color} onChange={this.onChangeFormValue} addonBefore="Color" data-form-attr="color"/>
                    {this.renderJsonInput('effects', 'Effects')}
                    <Input type="text" value={this.state.formData.applyEffectFrequency} onChange={this.onChangeFormValue} addonBefore="Apply Effect Frequency" data-form-attr="applyEffectFrequency"/>
                    <Input type="text" value={this.state.formData.width} onChange={this.onChangeFormValue} addonBefore="Width" data-form-attr="width"/>
                    <Input type="text" value={this.state.formData.height} onChange={this.onChangeFormValue} addonBefore="Height" data-form-attr="height"/>
                    <Input type="checkbox" data-type="checkbox" checked={this.state.formData.isSolid} onChange={this.onChangeFormValue} label="Is Solid" data-form-attr="isSolid"/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveRectangleZone}>Save</Button>
                  </Modal.Footer>
                </Modal>

                {this.renderJsonPopup()}
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.rectanglezonetemplateStore;
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
                <td>{dataRow.skin}</td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.showEditPopup} data-id={dataRow.id}><Glyphicon glyph="edit" /></Button>
                    <Button bsStyle="primary" onClick={this.showDeletePopup} data-id={dataRow.id}><Glyphicon glyph="trash" /></Button>
                  </ButtonToolbar>
              </td>
            </tr>
        );
    },

    // onChangeFormValue: function (e) {
    //     var domField = e.currentTarget;
    //     var newFormData = this.state.formData;
    //     newFormData[domField.dataset.formAttr] = domField.value;
    //     this.setState({'formData': newFormData});
    // },

    deleteRectangleZone: function () {
        rectanglezonetemplateActions.delete(this.state.formData.id);
        this.hideDeletePopup();
    },

    saveRectangleZone: function () {
        if (this.state.formIsNew) {
            rectanglezonetemplateActions.add(this.state.formData);
        } else {
            rectanglezonetemplateActions.post(this.state.formData);
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
        var rectanglezonetemplateToEdit = _.clone(rectanglezonetemplateStore.getById(id));
        this.setState({
            'editPopupShown': true,
            'formData': rectanglezonetemplateToEdit,
            'formIsNew': false
        });
    },

    showDeletePopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var rectanglezonetemplateToDelete = _.clone(rectanglezonetemplateStore.getById(id));
        this.setState({
            'deletePopupShown': true,
            'formData': rectanglezonetemplateToDelete
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

module.exports = RectangleZone;
