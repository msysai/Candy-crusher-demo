// Game constants
const GRID_SIZE = 8;
const CANDY_TYPES = 6;
const CANDY_SYMBOLS = ['🍬', '🍭', '🍫', '🍩', '🍪', '🧁'];

// Game state
let grid = [];
let selectedCandy = null;
let score = 0;
let moves = 0;
let isProcessing = false;

// DOM elements
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');

// Initialize game
function initGame() {
    grid = [];
    score = 0;
    moves = 0;
    selectedCandy = null;
    isProcessing = false;
    
    updateUI();
    createGrid();
    renderGrid();
}

// Create initial grid with random candies
function createGrid() {
    for (let row = 0; row < GRID_SIZE; row++) {
        grid[row] = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            grid[row][col] = {
                type: Math.floor(Math.random() * CANDY_TYPES),
                row: row,
                col: col
            };
        }
    }
    
    // Ensure no initial matches
    removeInitialMatches();
}

// Remove any matches that exist at game start
function removeInitialMatches() {
    let hasMatches = true;
    while (hasMatches) {
        hasMatches = false;
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (checkMatchAt(row, col)) {
                    grid[row][col].type = Math.floor(Math.random() * CANDY_TYPES);
                    hasMatches = true;
                }
            }
        }
    }
}

// Render the grid to the DOM
function renderGrid() {
    gameBoard.innerHTML = '';
    
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const candy = grid[row][col];
            const candyElement = document.createElement('div');
            candyElement.className = 'candy';
            candyElement.dataset.row = row;
            candyElement.dataset.col = col;
            candyElement.dataset.type = candy.type;
            candyElement.textContent = CANDY_SYMBOLS[candy.type];
            
            candyElement.addEventListener('click', () => handleCandyClick(row, col));
            
            gameBoard.appendChild(candyElement);
        }
    }
}

// Handle candy click
function handleCandyClick(row, col) {
    if (isProcessing) return;
    
    const clickedCandy = { row, col };
    
    if (!selectedCandy) {
        // First selection
        selectedCandy = clickedCandy;
        highlightCandy(row, col, true);
    } else {
        // Second selection
        if (selectedCandy.row === row && selectedCandy.col === col) {
            // Deselect
            highlightCandy(row, col, false);
            selectedCandy = null;
        } else if (isAdjacent(selectedCandy, clickedCandy)) {
            // Swap candies
            highlightCandy(selectedCandy.row, selectedCandy.col, false);
            swapCandies(selectedCandy, clickedCandy);
            selectedCandy = null;
        } else {
            // Select new candy
            highlightCandy(selectedCandy.row, selectedCandy.col, false);
            selectedCandy = clickedCandy;
            highlightCandy(row, col, true);
        }
    }
}

// Highlight selected candy
function highlightCandy(row, col, highlight) {
    const candyElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (candyElement) {
        if (highlight) {
            candyElement.classList.add('selected');
        } else {
            candyElement.classList.remove('selected');
        }
    }
}

// Check if two positions are adjacent
function isAdjacent(pos1, pos2) {
    const rowDiff = Math.abs(pos1.row - pos2.row);
    const colDiff = Math.abs(pos1.col - pos2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// Swap two candies
function swapCandies(pos1, pos2) {
    isProcessing = true;
    
    // Swap in grid
    const temp = grid[pos1.row][pos1.col];
    grid[pos1.row][pos1.col] = grid[pos2.row][pos2.col];
    grid[pos2.row][pos2.col] = temp;
    
    // Update positions
    grid[pos1.row][pos1.col].row = pos1.row;
    grid[pos1.row][pos1.col].col = pos1.col;
    grid[pos2.row][pos2.col].row = pos2.row;
    grid[pos2.row][pos2.col].col = pos2.col;
    
    // Check for matches
    setTimeout(() => {
        const hasMatches = findAndRemoveMatches();
        
        if (hasMatches) {
            moves++;
            updateUI();
            processMatches();
        } else {
            // No matches, swap back
            const temp = grid[pos1.row][pos1.col];
            grid[pos1.row][pos1.col] = grid[pos2.row][pos2.col];
            grid[pos2.row][pos2.col] = temp;
            
            grid[pos1.row][pos1.col].row = pos1.row;
            grid[pos1.row][pos1.col].col = pos1.col;
            grid[pos2.row][pos2.col].row = pos2.row;
            grid[pos2.row][pos2.col].col = pos2.col;
            
            renderGrid();
            isProcessing = false;
        }
    }, 300);
}

// Find and remove all matches
function findAndRemoveMatches() {
    const matches = [];
    
    // Check horizontal matches
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE - 2; col++) {
            const type = grid[row][col].type;
            if (type === grid[row][col + 1].type && type === grid[row][col + 2].type) {
                matches.push({ row, col });
                matches.push({ row, col: col + 1 });
                matches.push({ row, col: col + 2 });
            }
        }
    }
    
    // Check vertical matches
    for (let col = 0; col < GRID_SIZE; col++) {
        for (let row = 0; row < GRID_SIZE - 2; row++) {
            const type = grid[row][col].type;
            if (type === grid[row + 1][col].type && type === grid[row + 2][col].type) {
                matches.push({ row, col });
                matches.push({ row: row + 1, col });
                matches.push({ row: row + 2, col });
            }
        }
    }
    
    // Remove duplicates
    const uniqueMatches = [];
    const seen = new Set();
    
    for (const match of matches) {
        const key = `${match.row},${match.col}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueMatches.push(match);
        }
    }
    
    // Remove matched candies
    if (uniqueMatches.length > 0) {
        for (const match of uniqueMatches) {
            grid[match.row][match.col] = null;
        }
        score += uniqueMatches.length * 10;
        updateUI();
    }
    
    return uniqueMatches.length > 0;
}

// Check if a specific position has a match
function checkMatchAt(row, col) {
    const type = grid[row][col].type;
    
    // Check horizontal
    if (col >= 2 && 
        grid[row][col-1].type === type && 
        grid[row][col-2].type === type) {
        return true;
    }
    if (col >= 1 && col < GRID_SIZE - 1 && 
        grid[row][col-1].type === type && 
        grid[row][col+1].type === type) {
        return true;
    }
    if (col < GRID_SIZE - 2 && 
        grid[row][col+1].type === type && 
        grid[row][col+2].type === type) {
        return true;
    }
    
    // Check vertical
    if (row >= 2 && 
        grid[row-1][col].type === type && 
        grid[row-2][col].type === type) {
        return true;
    }
    if (row >= 1 && row < GRID_SIZE - 1 && 
        grid[row-1][col].type === type && 
        grid[row+1][col].type === type) {
        return true;
    }
    if (row < GRID_SIZE - 2 && 
        grid[row+1][col].type === type && 
        grid[row+2][col].type === type) {
        return true;
    }
    
    return false;
}

// Process matches with animation
function processMatches() {
    // Animate matched candies
    const matchedElements = document.querySelectorAll('.candy');
    matchedElements.forEach(el => {
        const row = parseInt(el.dataset.row);
        const col = parseInt(el.dataset.col);
        if (grid[row][col] === null) {
            el.classList.add('matched');
        }
    });
    
    setTimeout(() => {
        applyGravity();
    }, 400);
}

// Apply gravity and refill
function applyGravity() {
    // Move candies down
    for (let col = 0; col < GRID_SIZE; col++) {
        let emptyRow = GRID_SIZE - 1;
        
        for (let row = GRID_SIZE - 1; row >= 0; row--) {
            if (grid[row][col] !== null) {
                if (row !== emptyRow) {
                    grid[emptyRow][col] = grid[row][col];
                    grid[emptyRow][col].row = emptyRow;
                    grid[row][col] = null;
                }
                emptyRow--;
            }
        }
        
        // Fill empty spaces with new candies
        for (let row = emptyRow; row >= 0; row--) {
            grid[row][col] = {
                type: Math.floor(Math.random() * CANDY_TYPES),
                row: row,
                col: col
            };
        }
    }
    
    // Render and check for new matches
    renderGrid();
    
    setTimeout(() => {
        if (findAndRemoveMatches()) {
            processMatches();
        } else {
            isProcessing = false;
        }
    }, 300);
}

// Update UI
function updateUI() {
    scoreDisplay.textContent = score;
    movesDisplay.textContent = moves;
}

// Event listeners
restartBtn.addEventListener('click', initGame);

// Start game when page loads
document.addEventListener('DOMContentLoaded', initGame);