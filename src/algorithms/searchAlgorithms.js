export function bfs(nodes, start, end) {
    let grid = copyGrid(nodes);
    let visitedNodes = [[grid[start.row][start.col]]];
    let index = 0;
    while(visitedNodes[index].length > 0 && index < 50) {
        let currentNodes = visitedNodes[index];
        let neighborNodes = [];
        currentNodes.forEach((node) => {
            if(!node.isVisited) {
                node.isVisited = true;
                if(node.row === end.row && node.col === end.col) {
                    visitedNodes.push(neighborNodes);
                    return visitedNodes;
                }
                neighborNodes = neighborNodes.concat(getNeighbors(grid, node));
            }
        })
        visitedNodes.push(neighborNodes); 
        index++;
    }
    return visitedNodes;
}

function copyGrid(grid) {
    let copy = [];
    for(const row of grid) {
        let copiedRow = [];
        for(const node of row) {
            const currentNode = {
                ...node
            }; 
            copiedRow.push(currentNode);
        }
        copy.push(copiedRow);
    }
    return copy;
}

function getNeighbors(grid, node) {
    let neighbors = []
    let {row, col} = node;
    if(row < grid.length -1) {
        neighbors.push(grid[node.row+1][node.col]);
    }
    if(row > 0) {
        neighbors.push(grid[node.row-1][node.col]);
    }
    if(col < grid[0].length - 1) {
        neighbors.push(grid[node.row][node.col+1]);
    }
    if(col > 0) {
        neighbors.push(grid[node.row][node.col-1]);
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}