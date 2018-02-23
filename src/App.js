import 'react-sortable-tree/style.css';
import React, {Component} from 'react';
import SortableTree, {changeNodeAtPath, addNodeUnderParent, removeNodeAtPath} from 'react-sortable-tree';


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

  render() {
    const getNodeKey = ({treeIndex}) => treeIndex;
    return (
      <div>
        <div style={{height: 300}}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({treeData})}
            generateNodeProps={({node, path}) => ({
              title: ([
                  <input
                    style={{fontSize: '1.1rem'}}
                    value={node.name}
                    onChange={event => {
                      const name = event.target.value;

                      this.setState(state => ({
                        treeData: changeNodeAtPath({
                          treeData: state.treeData,
                          path,
                          getNodeKey,
                          newNode: {...node, name},
                        }),
                      }));
                    }}
                  />, <br/>, <input
                    style={{fontSize: '1.1rem'}}
                    value={node.name}
                    onChange={event => {
                      const name = event.target.value;

                      this.setState(state => ({
                        treeData: changeNodeAtPath({
                          treeData: state.treeData,
                          path,
                          getNodeKey,
                          newNode: {...node, name},
                        }),
                      }));
                    }}
                  />]
              ),
              buttons: [
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: addNodeUnderParent({
                        treeData: state.treeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {
                          title: `New One`,
                        },
                      }).treeData,
                    }))
                  }>
                  Add Child
                </button>,
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }))
                  }>
                  Remove
                </button>,
              ]
            })}
          />
        </div>
        <button
          onClick={() =>
            this.setState(state => ({
              treeData: state.treeData.concat({
                title: `New one`,
              }),
            }))
          }
        >
          Add more
        </button>
      </div>
    );
  }
}