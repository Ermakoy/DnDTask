import 'react-sortable-tree/style.css';
import React, {Component} from 'react';
import SortableTree, {changeNodeAtPath, addNodeUnderParent, removeNodeAtPath} from 'react-sortable-tree';

const getNodeKey = ({treeIndex}) => treeIndex;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
    };
  }

  removeNode = (path, getNodeKey) => {
    this.setState(state => ({
      treeData: removeNodeAtPath({
        treeData: state.treeData,
        path,
        getNodeKey,
      }),
    }))
  };


  addSingleValueParam = () => {
    this.setState(state => ({
      treeData: state.treeData.concat({
        title: <input
          style={{fontSize: '1.1rem'}}
          placeholder="Param Name"
          readOnly="readOnly"
        />,
      }),
    }))
  };

  addDoubleValueParam = () => {
    this.setState(state => ({
      treeData: state.treeData.concat({
        title: [<input
          style={{fontSize: '1.1rem'}}
          placeholder="Param Name"
          readOnly="readOnly"
        />, <br/>,
          <input
            style={{fontSize: '1.1rem'}}
            value="Param Value"
            disabled="disabled"
          />]
      }),
    }))
  };

  genButtons = ({node, path}) => ({
    buttons: [
      <button
        onClick={() =>
          this.setState(state => ({
            treeData: removeNodeAtPath({
              treeData: state.treeData,
              path,
              getNodeKey,
            }),
          }))
        }
      >
        Remove
      </button>,
    ]
  });

  checkAndPublish = () => {
    if (this.state.treeData.length < 4){
      alert(`You need ${4 - this.state.treeData.length} more first level params`);
    }
  };

  render() {
    return (
      <div>
        <div style={{height: 300}}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({treeData})}
            generateNodeProps={this.genButtons}
          />
        </div>
        <button
          onClick={this.addSingleValueParam}
        >
          Add more single string param
        </button>
        <button
          onClick={this.addDoubleValueParam}
        >
          Add more param with string value
        </button>
        <button onClick={this.checkAndPublish}>Publish</button>
      </div>
    )
      ;
  }
}