var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Input = ReactBootstrap.Input;

module.exports = {
    getInitialState: function () {
        return {
            jsonEditorPopupShown: false,
            jsonEditor: null,
            jsonEditorFieldEdited: null
        };
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

    onChangeFormValue: function (e) {
        var domField = e.currentTarget;
        var newFormData = this.state.formData;
        var fieldType = domField.dataset.type;
        switch (fieldType) {
        case "json" :
            newFormData[domField.dataset.formAttr] = JSON.parse(domField.value);
            break;
        case "checkbox" :
            newFormData[domField.dataset.formAttr] = domField.checked;
            break;
        case "text" :
        default :
            newFormData[domField.dataset.formAttr] = domField.value;
        }
        this.setState({'formData': newFormData});
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

    hideJsonEditorPopup: function (e) {
        this.setState({
            'jsonEditorPopupShown': false
        });
    },

    renderJsonPopup: function (e) {
        return (<Modal show={this.state.jsonEditorPopupShown} onHide={this.hideJsonEditorPopup}>
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
        </Modal>);
    },

    renderJsonInput: function (field, label) {
        return (<Input
            type="text"
            onClick={function () {
                this.showJsonEditorPopup(field);
            }.bind(this)}
            value={JSON.stringify(this.state.formData[field])}
            data-type="json" onChange={this.onChangeFormValue}
            label={label}
            data-form-attr={field}
            readOnly
        />);
    }
};
