// Return the current time

function calculateDaysBetweenDates(begin, end) {    
    const diff = Math.abs(begin - end);
    const diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffInDays;
}

// Rerturn the current time
function getCurrentTime() {
    return new Date();
}

// BFS Algorithm
function bfs(graph, start, end) {
    let queue = [];
    let visited = [];
    let parent = {};
    let path = [];

    queue.push(start);
    visited.push(start);

    while (queue.length > 0) {
        let current = queue.shift();
        if (current === end) {
            while (current !== start) {
                path.push(current);
                current = parent[current];
            }
            path.push(start);
            return path.reverse();
        }
        for (let neighbor of graph[current]) {
            if (!visited.includes(neighbor)) {
                queue.push(neighbor);
                visited.push(neighbor);
                parent[neighbor] = current;
            }
        }
    }
}

//DFS Algorithm
function dfs(graph, start, end) {
    let stack = [];
    let visited = [];
    let parent = {};
    let path = [];

    stack.push(start);
    visited.push(start);

    while (stack.length > 0) {
        let current = stack.pop();
        if (current === end) {
            while (current !== start) {
                path.push(current);
                current = parent[current];
            }
            path.push(start);
            return path.reverse();
        }
        for (let neighbor of graph[current]) {
            if (!visited.includes(neighbor)) {
                stack.push(neighbor);
                visited.push(neighbor);
                parent[neighbor] = current;
            }
        }
    }
}