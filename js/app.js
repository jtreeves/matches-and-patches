// Grab parts of webpage with query selectors

const guide = document.querySelector('.guide')
const smallBoard = document.querySelector('.small-board')
const userTiles = document.querySelector('.user-tiles')
const options = document.querySelector('.options')

// Create elements of webpage and append some of them to the webpage with above query selectors

const guideHeader = document.createElement('h3')
guideHeader.textContent = 'Guide'
guide.append(guideHeader)

const guideBody = document.createElement('div')
guide.append(guideBody)

const introduction = document.createElement('p')
introduction.textContent = 'Welcome to Matches and Patches! This is a simple matching game. Think Uno crossed with Dominoes, but played on a mini Checkers board. If you want to skip straight to the game, just click the Play button at the bottom left. If you want to learn more about the rules of the game, just click the More Info button below.'

const slide1 = document.createElement('p')
slide1.textContent = 'The game is played on a board with four rows and four columns. At the beginning of the game, you and your unseen opponent will be dealt four tiles. Each tile features a color, a number, and a shape. In each round, you and your opponent will play one tile on one of the patches on the board. If your tile matches an adjacent tile on the board, then you can capture the patch you played and the patch with the matching tile.'

const slide2 = document.createElement('p')
slide2.textContent = 'After playing your tiles, you and your opponent will each be dealt an additional tile. For every patch on the board that you capture, you get a point. The game ends when all the patches on the board are covered (or when there are not enough left for another round), and the winner is the player with the most points.'

const slide3 = document.createElement('p')
slide3.textContent = 'But what is a match? If two tiles share at least one feature (shape, number, or color), then they match. For instance, the Red Two Circle matches with the Red One Square because they share a color. It also matches with the Blue Two Triangle because they share a number. However, it does not match with the Blue Three Triangle because they do not share any common feature.'

const slide4 = document.createElement('p')
slide4.textContent = 'Still a little confused about the game? The best way to fix that is to play it! Plus, throughout the game, you can turn to this guide for feedback about what is happening in each round and what the current score is.'

const moreInfo = document.createElement('div')
moreInfo.textContent = 'More Info'
moreInfo.classList.add('button')

const aboutUserTiles = document.createElement('div')
aboutUserTiles.textContent = 'Your tiles will appear here'
aboutUserTiles.style.color = 'gray'
aboutUserTiles.style.fontSize = '30px'
aboutUserTiles.style.fontStyle = 'italic'
userTiles.append(aboutUserTiles)

const play = document.createElement('div')
play.textContent = 'Play'
play.classList.add('button')
options.append(play)

const submit = document.createElement('div')
submit.textContent = 'Submit'
submit.classList.add('button')

const reset = document.createElement('div')
reset.textContent = 'Reset'
reset.classList.add('button')

// Create guide that will act as a user's console, providing feedback throughout the game

function feedback(status) {
    let message = document.createElement('p')
    message.textContent = status
    guideBody.prepend(message)
    if (guideBody.childElementCount > 16) {
        guideBody.removeChild(guideBody.lastChild)
    }
}

// Introductory slides that explain the game to the user

function aboutMatchesAndPatches() {
    guideBody.append(introduction)
    guideBody.append(moreInfo)
    moreInfo.addEventListener('click', function() {
        guideBody.removeChild(introduction)
        guideBody.prepend(slide1)
        moreInfo.addEventListener('click', function() {
            guideBody.removeChild(slide1)
            guideBody.prepend(slide2)
            moreInfo.addEventListener('click', function() {
                guideBody.removeChild(slide2)
                guideBody.prepend(slide3)
                moreInfo.addEventListener('click', function() {
                    guideBody.removeChild(slide3)
                    guideBody.removeChild(moreInfo)
                    guideBody.prepend(slide4)
                })
            })
        })
    })
}

aboutMatchesAndPatches()

// Create board's patches with class

class Patch {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.status = 'inactive';
        this.div = document.createElement('div');
    }
}

// Store patches in an array as objects, with keys including the patch name and status of the patch, which could have values of: 'inactive' (starting value), 'user active', 'opponent active', 'user captured', 'opponent captured', and <name of tile>

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

// Display 16-patch-version of board

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
            tiles[i].shape = 'trapezoid'
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

// Reset game by clicking the reset button, which will reload the page

reset.addEventListener('click', location.reload.bind(location))