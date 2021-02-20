import React, {Component} from 'react';
import './SearchVisualizer.css';
import { Node } from './Node/Node.js';
import { bfs, dfs } from '../algorithms/searchAlgorithms.js'

const NUM_ROWS = 20;
const NUM_COLS = 30;

export class SearchVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [], 
            startNode: {x: 10, y: 10},
            endNode: {x: 20, y: 15}, 
            animating: false
        };
        this.visualizeBFS = this.visualizeBFS.bind(this);
        this.visualizeDFS = this.visualizeDFS.bind(this);
        this.animateBFS = this.animateBFS.bind(this);
        this.initializeGrid = this.initializeGrid.bind(this);
    }
    componentDidMount() {
        this.initializeGrid();
    }
    initializeGrid(callback = () => {}) {
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
        this.setState({nodes}, callback);
    }
    animateBFS(orderedVisitedNodes) {
        for(let i = 0; i < orderedVisitedNodes.length; i++) {
            orderedVisitedNodes[i].forEach((node) => { 
                setTimeout(() => {
                    const newGrid = this.state.nodes;
                    const newNode = {...node, isVisited: true};
                    newGrid[node.row][node.col] = newNode;
                    this.setState({nodes: newGrid});
                    if(i === orderedVisitedNodes.length - 1) { this.setState({animating: false}); }
                }, 100 * i);
            });
        }
    }
    animateDFS(orderedVisitedNodes) {
        for(let i = 0; i < orderedVisitedNodes.length; i++) {
            setTimeout(() => {
                const newGrid = this.state.nodes;
                let node = orderedVisitedNodes[i];
                const newNode = {...node, isVisited: true};
                newGrid[node.row][node.col] = newNode;
                this.setState({nodes: newGrid});
                if(i === orderedVisitedNodes.length - 1) { this.setState({animating: false}); }
            }, 10 * i);
        }
    }
    visualizeBFS() {
        this.setState({animating: true}, () => {
            this.initializeGrid(() => {
                    let {x: startX, y: startY} = this.state.startNode;
                    let {x: endX, y: endY} = this.state.endNode;
                    const {nodes: grid} = this.state;
                    let orderedVisitedNodes = bfs(grid, grid[startY][startX], grid[endY][endX]);
                    this.animateBFS(orderedVisitedNodes);
            });
        });
    }
    visualizeDFS() {
        this.setState({animating: true}, () => {
            this.initializeGrid(() => {
                    let {x: startX, y: startY} = this.state.startNode;
                    let {x: endX, y: endY} = this.state.endNode;
                    const {nodes: grid} = this.state;
                    let orderedVisitedNodes = dfs(grid, grid[startY][startX], grid[endY][endX]);
                    this.animateDFS(orderedVisitedNodes);
            });
        });
    }
    render() {
        let {nodes} = this.state;
        return (
            <div>
                <div id="header">
                    <span id="title">Search Visualizer</span>
                    <button className="search-btn" disabled={this.state.animating} onClick={this.visualizeBFS}>Breadth-First Search</button>
                    <button className="search-btn" disabled={this.state.animating} onClick={this.visualizeDFS}>Depth-First Search</button>
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