var gamelevelActions = require('../actions/gamelevel');
var gamelevelStore = require('../stores/gamelevel');

var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Table = ReactBootstrap.Table;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

var Gamelevel = React.createClass({

    mixins: [Reflux.connect(gamelevelStore, "gamelevelStore")],

    getInitialState: function () {
        return {
            gamelevelStore: [],
            editPopupShown: false,
            deletePopupShown: false,
            formData: {},
            formIsNew: false
        };
    },

    componentWillMount: function () {
        gamelevelActions.get();
    },

    render: function () {
        return (
            <div>
                <h1>
                    Gamelevels&nbsp;
                    <Button bsStyle="primary" onClick={this.showAddPopup}><Glyphicon glyph="plus" /></Button>
                </h1>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Content</th>
                            <th>Regex URL</th>
                            <th>Area DOM ID</th>
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
                    <Modal.Title>Delete gamelevel {this.state.formData.name} (ID:{this.state.formData.id})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Do you really want to delete gamelevel {this.state.formData.name} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideDeletePopup}>No</Button>
                    <Button onClick={this.deleteGamelevel} bsStyle="danger">Yes</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Popup */}
                <Modal show={this.state.editPopupShown} onHide={this.hideEditPopup}>
                  <Modal.Header closeButton>
                    <Modal.Title>{this.state.formIsNew ? "Create" : "Edit"} gamelevel {this.state.formData.name} (ID:{this.state.formData.id || "n/a"})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Input type="text" value={this.state.formData.name} onChange={this.onChangeFormValue} label="Name" data-form-attr="name"/>
                    <Input type="textarea" value={JSON.stringify(this.state.formData.content)} style={{'minHeight': '400px'}} onChange={this.onChangeFormValue} label="Content" data-form-attr="content"/>
                    <Input type="text" value={this.state.formData.regexUrl} onChange={this.onChangeFormValue} label="Regex URL" data-form-attr="regexUrl"/>
                    <Input type="text" value={this.state.formData.areaDomID} onChange={this.onChangeFormValue} label="Area DOM ID" data-form-attr="areaDomID"/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.hideEditPopup}>Cancel</Button>
                    <Button onClick={this.saveGamelevel}>Save</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    },

    renderRows: function () {
        var dataRows = this.state.gamelevelStore;
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
                <td><Input type="textarea" value={JSON.stringify(dataRow.content)} readOnly/></td>
                <td>{dataRow.regexUrl}</td>
                <td>{dataRow.areaDomID}</td>
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

    deleteGamelevel: function () {
        gamelevelActions.delete(this.state.formData.id);
        this.hideDeletePopup();
    },

    saveGamelevel: function () {
        var data = {
            id: this.state.formData.id,
            name: this.state.formData.name,
            content: this.state.formData.content,
            regexUrl: this.state.formData.regexUrl,
            areaDomID: this.state.formData.areaDomID
        };

        if (this.state.formIsNew) {
            gamelevelActions.add(data);
        } else {
            gamelevelActions.post(data);
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
            'editPopupShown': true,
            'formData': {},
            'formIsNew': true
        });
    },

    showEditPopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var gamelevelToEdit = gamelevelStore.getById(id);
        this.setState({
            'editPopupShown': true,
            'formData': _.clone(gamelevelToEdit),
            'formIsNew': false
        });
    },

    showDeletePopup: function (e) {
        var id = parseInt(e.currentTarget.dataset.id);
        var gamelevelToDelete = gamelevelStore.getById(id);
        this.setState({
            'deletePopupShown': true,
            'formData': gamelevelToDelete
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

module.exports = Gamelevel;
