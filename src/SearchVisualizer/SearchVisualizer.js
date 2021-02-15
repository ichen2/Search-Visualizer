import React, {Component} from 'react';
import './SearchVisualizer.css';
import { Node } from './Node/Node.js';
import { bfs } from '../algorithms/searchAlgorithms.js'

const NUM_ROWS = 20;
const NUM_COLS = 40;

export class SearchVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [], 
            startNode: {x: 10, y: 10},
            endNode: {x: 30, y: 15}
        };
        this.visualizeBFS = this.visualizeBFS.bind(this);
        this.animateBFS = this.animateBFS.bind(this);
        this.initializeGrid = this.initializeGrid.bind(this);
    }
    componentDidMount() {
        this.initializeGrid()
    }
    initializeGrid() {
        let {x: startX, y: startY} = this.state.startNode;
        let {x: endX, y: endY} = this.state.endNode;
        const nodes = [];
        for(let row = 0; row < NUM_ROWS; row++) {
            let nodeRow = [];
            for(let col = 0; col < NUM_COLS; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: row === startY && col == startX,
                    isEnd: row === endY && col == endX,
                    isVisited: false
                } 
                nodeRow.push(currentNode);
            }
            nodes.push(nodeRow);
        }
        this.setState({nodes});
    }
    animateBFS(orderedVisitedNodes) {
        for(let i = 0; i < orderedVisitedNodes.length; i++) {
            setTimeout(() => {
                const newGrid = this.state.nodes.slice();
                orderedVisitedNodes[i].forEach((node) => {
                    //console.log(node);  
                    const newNode = {...node, isVisited: true};
                    newGrid[node.row][node.col] = newNode;
                });
                this.setState({nodes: newGrid});
            }, 100 * i);
        }
    }
    visualizeBFS() {
        let {x: startX, y: startY} = this.state.startNode;
        let {x: endX, y: endY} = this.state.endNode;
        const {nodes: grid} = this.state;
        let orderedVisitedNodes = bfs(grid, grid[startY][startX], grid[endY][endX]);
        this.animateBFS(orderedVisitedNodes);
    }
    render() {
        let {nodes} = this.state;
        console.log(nodes[15]);
        return (
            <div>
                <div id="header">
                    <span id="title">Search Visualizer</span>
                    <button className="search-btn" onClick={this.visualizeBFS}>Breadth-First Search</button>
                </div>
                <div id="grid">
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
            </div>
        );
    }
  }