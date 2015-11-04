var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Glyphicon = ReactBootstrap.Glyphicon;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var GameAreaEditor = React.createClass({

    getInitialState: function () {
        return {
            'mode': "move",
            'previousMousePositionX': 0,
            'previousMousePositionY': 0,
            'containerOffsetX': 0,
            'containerOffsetY': 0,
            'isClicked': false,
            'selectedBlock': null,
            'currentBlockState': []
        };
    },

    componentWillMount: function () {
        this.state.currentBlockState = _.clone(this.props.initialBlocks) || [];
    },

    render: function () {
        return (
          <div>
            <ButtonToolbar>
              <Row>
                  <Col xs={3} sm={3}>
                      <ButtonGroup>
                          <Button onClick={this.onClickAction} bsStyle="primary" active={this.state.mode === 'move'} data-mode="move"><Glyphicon glyph="move"/></Button>
                          <Button onClick={this.onClickAction} bsStyle="primary" active={this.state.mode === 'resize'} data-mode="resize"><Glyphicon glyph="resize-full"/></Button>
                          <Button onClick={this.onClickAction} bsStyle="primary" active={this.state.mode === 'plus'} data-mode="plus"><Glyphicon glyph="plus"/></Button>
                          <Button onClick={this.onClickAction} bsStyle="primary" active={this.state.mode === 'remove'} data-mode="remove"><Glyphicon glyph="remove"/></Button>
                      </ButtonGroup>
                  </Col>
                  <Col xs={3} sm={3}>
                      <Input type="text" readOnly value={this.state.previousMousePositionX - this.state.containerOffsetX} addonBefore="X"/>
                  </Col>
                  <Col xs={3} sm={3}>
                      <Input type="text" readOnly value={this.state.previousMousePositionY - this.state.containerOffsetY} addonBefore="Y"/>
                  </Col>
                  <Col xs={3} sm={3}>
                      <Button bsStyle={this.state.isClicked ? 'success' : 'default'} readOnly>{(this.state.selectedBlock === null) ? 'No selection' : 'Block: ' + this.state.selectedBlock}</Button>
                  </Col>
              </Row>
            </ButtonToolbar>

            <div style={{'overflow': 'scroll', 'width': '100%', 'height': '600px'}}>
                <div style={this.getContainerStyle()} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown} id="gamearea-gamelevel-editor-gamezone">
                    {this.renderBlocks(this.state.currentBlockState)}
                </div>
            </div>
          </div>
        );
    },

    renderBlocks: function (blocks) {
        var reactBlocks = [];
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            reactBlocks.push(
                <div style={{
                    width: block.width + 'px',
                    height: block.height + 'px',
                    position: 'absolute',
                    transform: "translate(" + block.position.x + "px, " +  block.position.y + "px)",
                    backgroundColor: 'rgb(150, 150, 150)',
                    border: '2px solid rgb(167, 89, 89)',
                    textAlign: 'center'
                }} key={i} data-id={i} className="is-block" draggable={false}>
                    <strong>X:</strong>{block.position.x} <strong>Y:</strong>{block.position.y} <strong>width:</strong>{block.width} <strong>height:</strong>{block.height}
                </div>
            );
        }
        return reactBlocks;
    },

    getContainerStyle: function () {
        return {
            'width': this.props.width + 'px',
            'height': this.props.height + 'px',
            'marginTop': '15px',
            'position': 'relative',
            'backgroundColor': 'rgb(208, 204, 204)'
        };
    },

    onClickAction: function (e) {
        this.setState({
            'mode': e.currentTarget.dataset.mode
        });
    },

    onMouseMove: function (e) {
        //MOVE
        this.setState({
            "previousMousePositionX": e.clientX,
            "previousMousePositionY": e.clientY
        });

        if (this.state.isClicked && isFinite(this.state.selectedBlock)) {
            var deltaX = (e.clientX - this.state.previousMousePositionX);
            var deltaY = (e.clientY - this.state.previousMousePositionY);
            var currentBlockState = this.state.currentBlockState;
            var currentBlock = currentBlockState[this.state.selectedBlock];

            var $currentTarget = $(e.currentTarget);
            var $currentTargetOffset = $currentTarget.offset();
            this.setState({
                "containerOffsetX": parseInt($currentTargetOffset.left),
                "containerOffsetY": parseInt($currentTargetOffset.top)
            });

            switch (this.state.mode) {
            case "move":
                currentBlock.position.x = parseInt(currentBlock.position.x) + parseInt(deltaX);
                currentBlock.position.y = parseInt(currentBlock.position.y) + parseInt(deltaY);
                this.setState({
                    "currentBlockState": currentBlockState
                });
                break;
            case "resize":
                currentBlock.width = parseInt(currentBlock.width) + parseInt(deltaX);
                currentBlock.height = parseInt(currentBlock.height) + parseInt(deltaY);
                this.setState({
                    "currentBlockState": currentBlockState
                });
                //todo
                break;
            }
        }
    },

    onMouseDown: function (e) {
        var $target = $(e.target);
        var $currentTarget = $(e.currentTarget);
        var $currentTargetOffset = $currentTarget.offset();

        //set mouse position then ADD block if needed
        this.setState({
            "containerOffsetX": parseInt($currentTargetOffset.left),
            "containerOffsetY": parseInt($currentTargetOffset.top),
            "previousMousePositionX": e.clientX,
            "previousMousePositionY": e.clientY
        }, function () {
            if (this.state.mode === 'plus') {
                this.addBlock();
            }
        });

        //manage click on block for REMOVE, RESIZE and MOVE purpose
        if ($target.hasClass("is-block")) {
            this.setState({
                "isClicked": true,
                "selectedBlock": $target.data("id")
            }, function () {
                if (this.state.mode === 'remove') {
                    this.removeBlock();
                }
            });
        }
        e.stopPropagation();
        e.preventDefault();
    },

    onMouseUp: function (e) {
        this.setState({
            "isClicked": false,
            "selectedBlock": null
        });

        if (isFinite(this.state.selectedBlock)) {
            this.props.onChange(this.state.currentBlockState);
        }
    },

    addBlock: function () {
        console.log(this.state);
        var currentBlockState = this.state.currentBlockState;
        var currentBlockStateLength = currentBlockState.length;
        currentBlockState.push(
            factoryBlock(
                currentBlockStateLength,
                this.state.previousMousePositionX - this.state.containerOffsetX,
                this.state.previousMousePositionY - this.state.containerOffsetY,
                100,
                100
            )
        );
        this.setState({
            "currentBlockState": currentBlockState
        });
    },

    removeBlock: function () {
        var currentBlockState = this.state.currentBlockState;
        currentBlockState.splice(this.state.selectedBlock, 1);
        this.setState({
            "currentBlockState": currentBlockState,
            "selectedBlock": null
        });
    }
});

var factoryBlock = function (id, x, y, width, height) {
    console.log(x + ':' + y);
    return {
        "position": {
            "x": x,
            "y": y
        },
        "width": 100,
        "height": 100,
        "type": {
            "value": "0",
            "type": "plateform"
        },
        "id": "block-" + id + "-by-id-block" + id,
        "vertexTL": {
            "x": x,
            "y": y
        },
        "vertexTR": {
            "x": x + width,
            "y": y
        },
        "vertexBL": {
            "x": x,
            "y": y + height
        },
        "vertexBR": {
            "x": x + width,
            "y": y + height
        }
    };
};

module.exports = GameAreaEditor;
