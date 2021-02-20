export function bfs(nodes, start, end) {
    let grid = copyGrid(nodes);
    let visitedNodes = [[grid[start.row][start.col]]];
    let index = 0;
    while(visitedNodes[index].length > 0) {
        let currentNodes = visitedNodes[index];
        let neighborNodes = [];
        for(let i = 0; i < currentNodes.length; i++) {
            let node = currentNodes[i];
            if(!node.isVisited) {
                node.isVisited = true;
                if(node.row === end.row && node.col === end.col) {
                    console.log(visitedNodes[index]);
                    visitedNodes[index] = visitedNodes[index].slice(0, i+1);
                    console.log(visitedNodes[index]);
                    return visitedNodes;
                }
                neighborNodes = neighborNodes.concat(getNeighbors(grid, node));
            }
        }
        visitedNodes.push(neighborNodes); 
        index++;
    }
    return visitedNodes;
}

export function dfs(nodes, start, end) {
    let grid = copyGrid(nodes);
    let visitedNodes = [grid[start.row][start.col]];
    let stack = [grid[start.row][start.col]];
    while(stack.length > 0) {   
        let currentNode = stack.pop();
        if(!currentNode.isVisted) {
            currentNode.isVisited = true;
            visitedNodes.push(currentNode);
            if(currentNode.row === end.row && currentNode.col === end.col) {
                return visitedNodes;
            }
            let neighborNodes = getNeighbors(grid, currentNode);
            neighborNodes.forEach((node) => stack.push(node));
        }
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
    if(col < grid[0].length - 1) {
        neighbors.push(grid[node.row][node.col+1]);
    }
    if(row > 0) {
        neighbors.push(grid[node.row-1][node.col]);
    }
    if(col > 0) {
        neighbors.push(grid[node.row][node.col-1]);
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}