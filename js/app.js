// Grab parts of webpage with query selectors

const smallBoard = document.querySelector('.small-board')
const userTiles = document.querySelector('.user-tiles')
const options = document.querySelector('.options')

// Create board's 64 patches with class

class Patch {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.status = 'inactive';
        this.div = document.createElement('div');
    }
}

// Store patches in an array as objects, with keys including the patch name and status of the patch, which could have values of:'inactive' (starting value), 'user active', 'opponent active', 'user captured', 'opponent captured', and <name of tile>

function createPatches() {
    let patches = []
    for (let i = 0; i < 64; i++) {
        if (i < 8) {
            patches.push(new Patch(1, ''))
        } else if (i < 16) {
            patches.push(new Patch(2, ''))
        } else if (i < 24) {
            patches.push(new Patch(3, ''))
        } else if (i < 32) {
            patches.push(new Patch(4, ''))
        } else if (i < 40) {
            patches.push(new Patch(5, ''))
        } else if (i < 48) {
            patches.push(new Patch(6, ''))
        } else if (i < 56) {
            patches.push(new Patch(7, ''))
        } else {
            patches.push(new Patch(8, ''))
        }
    }
    for (let i = 0; i < patches.length; i++) {
        if ((i + 1) % 8 === 1) {
            patches[i].column = 1
        } else if ((i + 1) % 8 === 2) {
            patches[i].column = 2
        } else if ((i + 1) % 8 === 3) {
            patches[i].column = 3
        } else if ((i + 1) % 8 === 4) {
            patches[i].column = 4
        } else if ((i + 1) % 8 === 5) {
            patches[i].column = 5
        } else if ((i + 1) % 8 === 6) {
            patches[i].column = 6
        } else if ((i + 1) % 8 === 7) {
            patches[i].column = 7
        } else {
            patches[i].column = 8
        }
    }
    for (let i = 0; i < patches.length; i++) {
        patches[i].name = `r${patches[i].row}c${patches[i].column}`
        patches[i].div.classList.add('patch')
    }
    return patches
}

let patches = createPatches()

console.log(patches)

// Display 16-patch board, with CSS and object's first 16 instances

function createSmallPatches() {
    let smallPatches = []
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].row <= 4 && patches[i].column <= 4) {
            smallPatches.push(patches[i])
        }
    }
    return smallPatches
}

let smallPatches = createSmallPatches()

function displaySmallBoard(array) {
    for (let i = 0; i < array.length; i++) {
        let smallPatch = array[i].div
        smallPatch.classList.add('small')
        smallBoard.appendChild(smallPatch)
    }
}

displaySmallBoard(smallPatches)

// Create main game tiles with class

class Tile {
    constructor(color, number, shape) {
        this.color = color;
        this.number = number;
        this.shape = shape;
        this.status = 'inactive';
        this.div = document.createElement('div');
    }
}

// Store main game tiles in an array as objects, with keys including the tile name and status of the tile, which could have values of: 'inactive' (starting value), 'user', 'opponent', 'user active', 'opponent active', and 'board'

function createTiles() {
    let tiles = []
    for (let i = 0; i < 64; i++) {
        if (i < 16) {
            tiles.push(new Tile('red', '', ''))
        } else if (i < 32) {
            tiles.push(new Tile('blue', '', ''))
        } else if (i < 48) {
            tiles.push(new Tile('yellow', '', ''))
        } else {
            tiles.push(new Tile('green', '', ''))
        }
    }
    for (let i = 0; i < tiles.length; i ++) {
        if ((i + 1) % 4 === 1) {
            tiles[i].number = 'one'
        } else if ((i + 1) % 4 === 2) {
            tiles[i].number = 'two'
        } else if ((i + 1) % 4 === 3) {
            tiles[i].number = 'three'
        } else {
            tiles[i].number = 'four'
        }
    }
    for (let i = 0; i < tiles.length; i++) {
        if ((i >= 0 && i<= 3) || (i >= 16 && i<= 19) || (i >= 32 && i<= 35) || (i >= 48 && i <= 51)) {
            tiles[i].shape = 'triangle'
        } else if ((i >= 4 && i<= 7) || (i >= 20 && i<= 23) || (i >= 36 && i<= 39) || (i >= 52 && i <= 55)) {
            tiles[i].shape = 'square'
        } else if ((i >= 8 && i<= 11) || (i >= 24 && i<= 27) || (i >= 40 && i<= 43) || (i >= 56 && i <= 59)) {
            tiles[i].shape = 'hexagon'
        } else {
            tiles[i].shape = 'circle'
        }
    }
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].name = `${tiles[i].color} ${tiles[i].number} ${tiles[i].shape}`
        tiles[i].div.classList.add('tile', tiles[i].color, tiles[i].number, tiles[i].shape)
    }
    return tiles
}

let tiles = createTiles()

// Creat players' tokens with a class

class Token {
    constructor() {
        this.div = document.createElement('div');
    }
}

function createTokens(player) {
    let pieces = []
    for (let i = 0; i < 64; i++) {
        pieces.push(new Token(player))
        pieces[i].name = player
        pieces[i].div.classList.add('tile', 'token', player);
    }
    return pieces
}

const userTokens = createTokens('user')
const opponentTokens = createTokens('opponent')

// Choose one tile at random from the 'inactive' elements of the tiles object

let randomTileIndex = ''

function generateRandomTileIndex() {
    randomTileIndex = Math.floor(Math.random()*64)
    return randomTileIndex
}

function chooseTile() {
    let choice = ''
    let randomTileIndex = generateRandomTileIndex()
    if (tiles[randomTileIndex].status === 'inactive') {
        choice = tiles[randomTileIndex]
    } else {
        choice = chooseTile()
    }
    return choice
}

// Deal tile to user by changing the tile's status to 'user'

function dealTileToUser() {
    let choice = chooseTile()
    choice.status = 'user'
    userTiles.append(choice.div)
}

// Deal tile to opponent by changing the tile's status to 'opponent'

function dealTileToOpponent() {
    let choice = chooseTile()
    choice.status = 'opponent'
}

// Deal each side four tiles by using the above functions

function openingDeal() {
    dealTileToUser()
    dealTileToOpponent()
    dealTileToUser()
    dealTileToOpponent()
    dealTileToUser()
    dealTileToOpponent()
    dealTileToUser()
    dealTileToOpponent()
}

openingDeal()

// Display submit button

const submit = document.createElement('div')
submit.textContent = 'Submit'
submit.classList.add('button')
options.append(submit)

// Select patch on board and tile from user's tiles

let userPatch = ''

function selectPatch() {
    for (let i = 0; i < smallPatches.length; i++) {
        if (smallPatches[i].status === 'inactive') {
            smallPatches[i].div.addEventListener('click', function() {
                userPatch = smallPatches[i]
                userPatch.status = 'user active'
                console.log(`User Patch: ${userPatch.name}`)
            })
        }
    }
    return userPatch
}

selectPatch()

let userTile = ''

function selectTile() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].status === 'user') {
            tiles[i].div.addEventListener('click', function() {
                userTile = tiles[i]
                userTile.status = 'user active'
                console.log(`User Tile: ${userTile.name}`)
            })
        }
    }
    return userTile
}

selectTile()

// AI performs similar functions: Choose patch at random and tile at random

let randomPatchIndex = ''

function generateRandomPatchIndex() {
    randomPatchIndex = Math.floor(Math.random()*16)
    return randomPatchIndex
}

let opponentPatch = ''

function randomPatch() {
    generateRandomPatchIndex()
    if (smallPatches[randomPatchIndex].status === 'inactive') {
        opponentPatch = smallPatches[randomPatchIndex]
        opponentPatch.status = 'opponent active'
        console.log(`Opponent Patch: ${opponentPatch.name}`)
    } else {
        opponentPatch = randomPatch()
    }
    return opponentPatch
}

let opponentTile = ''

function randomTile() {
    generateRandomTileIndex()
    if (tiles[randomTileIndex].status === 'opponent') {
        opponentTile = tiles[randomTileIndex]
        opponentTile.status = 'opponent active'
        console.log(`Opponent Tile: ${opponentTile.name}`)
    } else {
        opponentTile = randomTile()
    }
    return opponentTile
}

// Change board: After clicking 'submit' button, display user and opponent's moves simultaneously

submit.addEventListener('click', setUserMove)

function setUserMove() {
    setOpponentMove()
    changeBoard()
    checkMatchPairs()
    userTile.status = 'board'
    opponentTile.status = 'board'
    let scores = tally()
    console.log(`CURRENT SCORE: USER ${scores[0]}, OPPONENT ${scores[1]}`)
    subsequentDeal()
    selectPatch()
    selectTile()
    console.log('NEW ROUND')
    tokenUpgrade()
    determineWinner()
}

function setOpponentMove() {
    randomPatch()
    randomTile()
}

function changeBoard() {
    userPatch.div.append(userTile.div)
    opponentPatch.div.append(opponentTile.div)
}

function subsequentDeal() {
    dealTileToUser()
    dealTileToOpponent()
}

// Check for errors that would result in an unacceptable move: First move must be on a certain patch, subsequent moves must be on touching patches, and moves must be on 'inactive' patches

// Check for conflicts that would result in an uncompleted move: If user and AI choose same patch, then the patch goes to the player whose side includes that patch; player must still use selected tile, but choose a different patch

// Change newly played patches on the board to have values of <name of tile> in the patches object

// Change newly played tiles on the board to have values of 'user active' or 'opponent active', based on who played what, in the tiles object

// Evaluate all possible match pairs for each player at the end of each round by looking at patches not marked with 'inactive' or 'locked' in patches object that are near patches occupied by <name of tile>, where that tile is marked as 'user active' or 'opponent active' in the tiles object

function checkMatchPairs() {
    userPatch.status = userTile.name
    opponentPatch.status = opponentTile.name
    checkUserPairs()
    checkOpponentPairs()
}

function checkUserPairs() { 
    let userRow = userPatch.row
    let userColumn = userPatch.column
    let userTopPatchRow = userRow - 1
    let userBottomPatchRow = userRow + 1
    let userLeftPatchColumn = userColumn - 1
    let userRightPatchColumn = userColumn + 1
    let userTopPatch = ''
    let userBottomPatch = ''
    let userLeftPatch = ''
    let userRightPatch = ''
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].row === userTopPatchRow && patches[i].column === userColumn) {
            userTopPatch = patches[i]
        } else if (patches[i].row === userBottomPatchRow && patches[i].column === userColumn) {
            userBottomPatch = patches[i]
        } else if (patches[i].row === userRow && patches[i].column === userLeftPatchColumn) {
            userLeftPatch = patches[i]
        } else if (patches[i].row === userRow && patches[i].column === userRightPatchColumn) {
            userRightPatch = patches[i]
        }
    }
    let userTopTile = ''
    let userBottomTile = ''
    let userLeftTile = ''
    let userRightTile = ''
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].name === userTopPatch.status) {
            userTopTile = tiles[i]
        } else if (tiles[i].name === userBottomPatch.status) {
            userBottomTile = tiles[i]
        } else if (tiles[i].name === userLeftPatch.status) {
            userLeftTile = tiles[i]
        } else if (tiles[i].name === userRightPatch.status) {
            userRightTile = tiles[i]
        }
    }
    if (userTile.color === userTopTile.color || userTile.number === userTopTile.number || userTile.shape === userTopTile.shape) {
        userPatch.status = 'user captured'
        userTopPatch.status = 'user captured'
        console.log('USER MATCHED WITH TOP')
    }
    if (userTile.color === userBottomTile.color || userTile.number === userBottomTile.number || userTile.shape === userBottomTile.shape) {
        userPatch.status = 'user captured'
        userBottomPatch.status = 'user captured'
        console.log('USER MATCHED WITH BOTTOM')
    }
    if (userTile.color === userLeftTile.color || userTile.number === userLeftTile.number || userTile.shape === userLeftTile.shape) {
        userPatch.status = 'user captured'
        userLeftPatch.status = 'user captured'
        console.log('USER MATCHED WITH LEFT')
    }
    if (userTile.color === userRightTile.color || userTile.number === userRightTile.number || userTile.shape === userRightTile.shape) {
        userPatch.status = 'user captured'
        userRightPatch.status = 'user captured'
        console.log('USER MATCHED WITH RIGHT')
    }
}

function checkOpponentPairs() { 
    let opponentRow = opponentPatch.row
    let opponentColumn = opponentPatch.column
    let opponentTopPatchRow = opponentRow - 1
    let opponentBottomPatchRow = opponentRow + 1
    let opponentLeftPatchColumn = opponentColumn - 1
    let opponentRightPatchColumn = opponentColumn + 1
    let opponentTopPatch = ''
    let opponentBottomPatch = ''
    let opponentLeftPatch = ''
    let opponentRightPatch = ''
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].row === opponentTopPatchRow && patches[i].column === opponentColumn) {
            opponentTopPatch = patches[i]
        } else if (patches[i].row === opponentBottomPatchRow && patches[i].column === opponentColumn) {
            opponentBottomPatch = patches[i]
        } else if (patches[i].row === opponentRow && patches[i].column === opponentLeftPatchColumn) {
            opponentLeftPatch = patches[i]
        } else if (patches[i].row === opponentRow && patches[i].column === opponentRightPatchColumn) {
            opponentRightPatch = patches[i]
        }
    }
    let opponentTopTile = ''
    let opponentBottomTile = ''
    let opponentLeftTile = ''
    let opponentRightTile = ''
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].name === opponentTopPatch.status) {
            opponentTopTile = tiles[i]
        } else if (tiles[i].name === opponentBottomPatch.status) {
            opponentBottomTile = tiles[i]
        } else if (tiles[i].name === opponentLeftPatch.status) {
            opponentLeftTile = tiles[i]
        } else if (tiles[i].name === opponentRightPatch.status) {
            opponentRightTile = tiles[i]
        }
    }
    if (opponentTile.color === opponentTopTile.color || opponentTile.number === opponentTopTile.number || opponentTile.shape === opponentTopTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentTopPatch.status = 'opponent captured'
        console.log('OPPONENT MATCHED WITH TOP')
    }
    if (opponentTile.color === opponentBottomTile.color || opponentTile.number === opponentBottomTile.number || opponentTile.shape === opponentBottomTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentBottomPatch.status = 'opponent captured'
        console.log('OPPONENT MATCHED WITH BOTTOM')
    }
    if (opponentTile.color === opponentLeftTile.color || opponentTile.number === opponentLeftTile.number || opponentTile.shape === opponentLeftTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentLeftPatch.status = 'opponent captured'
        console.log('OPPONENT MATCHED WITH LEFT')
    }
    if (opponentTile.color === opponentRightTile.color || opponentTile.number === opponentRightTile.number || opponentTile.shape === opponentRightTile.shape) {
        opponentPatch.status = 'opponent captured'
        opponentRightPatch.status = 'opponent captured'
        console.log('OPPONENT MATCHED WITH RIGHT')
    }
}

// Check for conflicts that would result in match pair disputes: If each player is attempting to match with the same tile, tally the points going along with each match pair, and award the tile to the winner

// Replace match pairs with player tokens on the patches; this changes display with the element from the array and the patch's value in the patches object to 'locked'

function tokenUpgrade() {
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].status === 'user captured') {
            patches[i].div.removeChild(patches[i].div.firstChild)
            patches[i].div.append(userTokens[i].div)
        } else if (patches[i].status === 'opponent captured') {
            patches[i].div.removeChild(patches[i].div.firstChild)
            patches[i].div.append(opponentTokens[i].div)
        }
    }
}

// Change tile's value in tile object to 'board'

// Deal new tile to each player at end of each round; involves changing the tile's value in the tile object

// Create tally for each player that tallies their tokens on the board

function tally() {
    let scores = [0, 0]
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].status === 'user captured') {
            scores[0]++
        } else if (patches[i].status === 'opponent captured') {
            scores[1]++
        }
    }
    return scores
}

// Update tally after each round by incrementing by however many pieces were captured

// Determine end of game: Less than two empty patches on the board

// Evaluate winner: Whichever player has the highest tally

function determineWinner() {
    let count = 0
    for (let i = 0; i < smallPatches.length; i++) {
        if (smallPatches[i].status === 'inactive') {
            count++
        }
    }
    if (count < 2) {
        console.log('GAME OVER!')
        let scores = tally()
        if (scores[0] > scores[1]) {
            console.log('You win!')
        } else if (scores[1] > scores[0]) {
            console.log('You lose!')
        } else {
            console.log('A tie!')
        }
    }
}

// Display winner

// Restart game by clearing board, and setting all patches' values to 'inactive' in patches object and all tiles' values as 'inactive' in tiles object