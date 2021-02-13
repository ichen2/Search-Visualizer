import React from 'react';
import './SearchVisualizer.css';
import { Node } from './Node/Node.js';
import { bfs } from '../algorithms/searchAlgorithms.js'

const NUM_ROWS = 20;
const NUM_COLS = 40;


export class SearchVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
    }
    componentDidMount() {
        const nodes = [];
        for(let row = 0; row < NUM_ROWS; row++) {
            let nodeRow = [];
            for(let col = 0; col < NUM_COLS; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: row === 10 && col == 10,
                    isEnd: row === 10 && col == 30,
                    isVisited: false
                } 
                nodeRow.push(currentNode);
            }
            nodes.push(nodeRow);
        }
        this.setState({nodes});
    }
    render() {
        let {nodes} = this.state;
        return (
            <div id="grid">
                <button onClick={bfs()}>Click Me</button>
                {nodes.map((row, rowIndex) => {
                    return <div className="row" key={rowIndex}>
                        {row.map((node, nodeIndex) => 
                            <Node 
                                key={nodeIndex}
                                isStart={node.isStart}
                                isEnd={node.isEnd}
                                isVisited={node.isVisited}
                            />
                        )}
                    </div>
                })}
            </div>
        );
    }
  }