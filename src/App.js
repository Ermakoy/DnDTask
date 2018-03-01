import 'react-sortable-tree/style.css';
import React, {Component} from 'react';
import SortableTree, {map, removeNodeAtPath} from 'react-sortable-tree';

const getNodeKey = ({treeIndex}) => treeIndex;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
    };
  }

  /**
   * Function, that adds a param with a name
   */
  addSingleValueParam = () => {
    this.setState(state => ({
      treeData: state.treeData.concat({
        title: [<input
          style={{fontSize: '1.1rem'}}
          placeholder="Param Name"
          readOnly
        />],
      }),
    }))
  };
  /**
   * Function, that adds a param with a name and string param
   */
  addDoubleValueParam = () => {
    this.setState(state => ({
      treeData: state.treeData.concat({
        title: [<input
          style={{fontSize: '1.1rem'}}
          placeholder="Param Name"
          readOnly={true}
        />, <br/>,
          <input
            style={{fontSize: '1.1rem'}}
            placeholder="Param Value"
            readOnly={true}
          />]
      }),
    }))
  };
  /**
   * Arrow function for setting every node buttons
   * @param node
   * @param path
   * @returns {{buttons: *[]}}
   */
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
  /**
   * Function checking for required number of first level params
   * and renders new state of components
   * or messaging that we don't have enough params
   */
  checkAndPublish = () => {
    if (this.state.treeData.length < 4) {
      alert(`You need ${4 - this.state.treeData.length} more first level params`);
    } else {
      let newTree = map({
        treeData: this.state.treeData,
        getNodeKey,
        callback: ({node}) => {
          return node.title ? {
            ...node, title: node.title.map((item) => {
              return {...item, props: {...item.props, readOnly: false}}
            })
          } : node;
        },
        ignoreCollapsed: false
      });
      this.setState({treeData: newTree});
      alert('Now you can modify params');
    }
  };

  render() {
    return (
      <div>
        <div style={{height: 500}}>
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