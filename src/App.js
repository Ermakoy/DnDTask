import 'react-sortable-tree/style.css';
import React, {Component} from 'react';
import SortableTree, {changeNodeAtPath, addNodeUnderParent, removeNodeAtPath} from 'react-sortable-tree';

const getNodeKey = ({treeIndex}) => treeIndex;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        {name: 'IT Manager'},
        {
          name: 'Regional Manager',
          expanded: true,
          children: [{name: 'Branch Manager'}],
        },
      ],
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

  render() {
    return (
      <div>
        <div style={{height: 300}}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({treeData})}
            />
        </div>
        <button
          onClick={() =>
            this.setState(state => ({
              treeData: state.treeData.concat({
                title: <input
                  style={{ fontSize: '1.1rem' }}
                  value="Param Name"
                  readOnly="readOnly"
                />,
              }),
            }))
          }
        >
          Add more single string param
        </button>
        <button
          onClick={() =>
            this.setState(state => ({
              treeData: state.treeData.concat({
                title: [<input
                  style={{ fontSize: '1.1rem' }}
                  value="Param Name"
                  readOnly="readOnly"
                />,<br/>,
                  <input
                    style={{ fontSize: '1.1rem' }}
                    value="Param Value"
                    readOnly="readOnly"
                  />]
              }),
            }))
          }
        >
          Add more param with string value
        </button>
      </div>
  )
    ;
  }
}