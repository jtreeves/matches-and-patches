// Grab parts of webpage with query selectors

const smallBoard = document.querySelector('.small-board')

const userTiles = document.querySelector('.user-tiles')

const opponentTiles = document.querySelector('.opponent-tiles')

const options = document.querySelector('.options')

// Create board's 64 patches with class

class Patch {
    constructor(i, row, column) {
        this.element = `patchElement${i}`;
        this.row = row;
        this.column = column;
        this.status = 'inactive';
        this.div = document.createElement('div');
        this.div.id = this.element;
    }
}

// Store patches as objects in an array, with keys of the patch and values of: 'inactive', 'user active', 'opponent active', <name of tile>, and 'locked'

let patches = []

function createPatches() {
    for (let i = 0; i < 64; i++) {
        if (i < 8) {
            patches.push(new Patch(i, 1, ''))
        } else if (i < 16) {
            patches.push(new Patch(i, 2, ''))
        } else if (i < 24) {
            patches.push(new Patch(i, 3, ''))
        } else if (i < 32) {
            patches.push(new Patch(i, 4, ''))
        } else if (i < 40) {
            patches.push(new Patch(i, 5, ''))
        } else if (i < 48) {
            patches.push(new Patch(i, 6, ''))
        } else if (i < 56) {
            patches.push(new Patch(i, 7, ''))
        } else {
            patches.push(new Patch(i, 8, ''))
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

createPatches()

console.log(patches)

// Display 16-patch board, with CSS and object's first 16 instances

let smallPatches = []

function createSmallPatches() {
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].row <= 4 && patches[i].column <= 4) {
            smallPatches.push(patches[i])
        }
    }
    return smallPatches
}

createSmallPatches()

console.log(smallPatches)

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
    constructor(i, color, number, shape) {
        this.element = `tileElement${i}`;
        this.color = color;
        this.number = number;
        this.shape = shape;
        this.status = 'inactive';
        this.div = document.createElement('div');
        this.div.id = this.element;
    }
}

// Store main game tiles in an array as objects, with keys including the tile name and status of the tile, which could have values of: 'inactive', 'user', 'opponent', 'user active', 'opponent active', and 'board' (but would begin as 'inactive')

let tiles = []

function createTiles() {
    for (let i = 0; i < 64; i++) {
        if (i < 16) {
            tiles.push(new Tile(i, 'red', '', ''))
        } else if (i < 32) {
            tiles.push(new Tile(i, 'blue', '', ''))
        } else if (i < 48) {
            tiles.push(new Tile(i, 'yellow', '', ''))
        } else {
            tiles.push(new Tile(i, 'green', '', ''))
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

createTiles()

console.log(tiles)

// Store players' tokens in an array

const tokens = ['user', 'opponent']

console.log(tokens)

// Choose one tile at random from the 'inactive' elements of the tiles object

let randomTileIndex = ''

function generateRandomTileIndex() {
    randomTileIndex = Math.floor(Math.random()*64)
    return randomTileIndex
}

let choice = ''

function chooseTile() {
    generateRandomTileIndex()
    if (tiles[randomTileIndex].status === 'inactive') {
        choice = tiles[randomTileIndex]
        console.log(choice.div)
    } else {
        chooseTile()
    }
    return choice
}

// Deal tile to user by changing the tile's status to 'user'

function dealTileToUser() {
    chooseTile()
    choice.status = 'user'
    userTiles.append(choice.div)
}

// Deal tile to opponent by changing the tile's status to 'opponent'

function dealTileToOpponent() {
    chooseTile()
    choice.status = 'opponent'
    opponentTiles.append(choice.div)
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

console.log(tiles)

// Display submit button

const submit = document.createElement('div')
submit.textContent = 'Submit'
submit.classList.add('button')
options.append(submit)

// Select patch on board and tile from user's tiles

let userPatch = ''

function selectPatch() {
    for (let i = 0; i < patches.length; i++) {
        if (patches[i].status === 'inactive') {
            patches[i].div.addEventListener('click', function() {
                userPatch = patches[i]
                console.log(userPatch.name)
                console.log(userPatch.div)
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
                console.log(userTile.name)
                console.log(userTile.div)
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
        console.log(opponentPatch.div)
    } else {
        randomPatch()
    }
    return opponentPatch
}

let opponentTile = ''

function randomTile() {
    generateRandomTileIndex()
    if (tiles[randomTileIndex].status === 'opponent') {
        opponentTile = tiles[randomTileIndex]
        console.log(opponentTile.div)
    } else {
        randomTile()
    }
    return opponentTile
}

// Change board: After clicking 'submit' button, display user and opponent's moves simultaneously

submit.addEventListener('click', setUserMove)

function setUserMove() {
    userPatch.status = userTile.name
    userTile.status = 'board'
    setOpponentMove()
    changeBoard()
    subsequentDeal()
}

function setOpponentMove() {
    randomPatch()
    randomTile()
    opponentPatch.status = opponentTile.name
    opponentTile.status = 'board'
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

// Check for conflicts that would result in match pair disputes: If each player is attempting to match with the same tile, tally the points going along with each match pair, and award the tile to the winner

// Replace match pairs with player tokens on the patches; this changes display with the element from the array and the patch's value in the patches object to 'locked'

// Change tile's value in tile object to 'board'

// Deal new tile to each player at end of each round; involves changing the tile's value in the tile object

// Create tally for each player that tallies their tokens on the board

// Update tally after each round by incrementing by however many pieces were captured

// Determine end of game: Less than two empty patches on the board

// Evaluate winner: Whichever player has the highest tally

// Display winner

// Restart game by clearing board, and setting all patches' values to 'inactive' in patches object and all tiles' values as 'inactive' in tiles object



// OLD CODE

// const main = document.querySelector('body')

// const container = document.querySelector('.container')

// const smallPatches = document.querySelectorAll('.small-patch')




// const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

// function generate16Tiles(color, shapesArray) {
//     const tilesArray = [];
    
//     for (let i = 0; i < 4; i++) {
//         let eachShape = shapesArray[i];

//         for (let j = 0; j < 4; j++) {
//             const newTile = document.createElement('div');
//             newTile.classList.add('tile', color, eachShape);
//             tilesArray.push(newTile);
//         }
//     }
    
//     tilesArray.forEach((tile, idx) => {
//         if (idx === 0 || idx === 4 || idx === 8 || idx === 12) {
//             tile.classList.add('one');
//         } else if (idx === 1 || idx === 5 || idx === 9 || idx === 13) {
//             tile.classList.add('two');
//         } else if (idx === 2 || idx === 6 || idx === 10 || idx === 14) {
//             tile.classList.add('three');
//         } else if (idx === 3 || idx === 7 || idx === 11 || idx === 15) {
//             tile.classList.add('four');
//         }
//     });

//     console.log(tilesArray);
//     return tilesArray;
// }

// const redTiles = generate16Tiles('red', ['triangle', 'square', 'circle', 'hexagon']);
// const blueTiles = generate16Tiles('blue', ['triangle', 'square', 'circle', 'hexagon']);
// const yellowTiles = generate16Tiles('yellow', ['triangle', 'square', 'circle', 'hexagon']);
// const greenTiles = generate16Tiles('green', ['triangle', 'square', 'circle', 'hexagon']);

// const allTiles = [...redTiles, ...blueTiles, ...yellowTiles, ...greenTiles];
// console.log(allTiles);

// document.addEventListener('DOMContentLoaded', iteratePatches)

// function dealFourCards() {
//     const playingallTiles = []

//     randomIndex1 = Math.floor(Math.random()*allTiles.length)
//     randomCard1 = allTiles.splice(randomIndex1, 1)[0]
//     playingallTiles.push(randomCard1)
//     console.log(randomCard1)
//     container.appendChild(randomCard1)

//     randomIndex2 = Math.floor(Math.random()*allTiles.length)
//     randomCard2 = allTiles.splice(randomIndex2, 1)[0]
//     playingallTiles.push(randomCard2)
//     container.appendChild(randomCard2)

//     randomIndex3 = Math.floor(Math.random()*allTiles.length)
//     randomCard3 = allTiles.splice(randomIndex3, 1)[0]
//     playingallTiles.push(randomCard3)
//     container.appendChild(randomCard3)

//     randomIndex4 = Math.floor(Math.random()*allTiles.length)
//     randomCard4 = allTiles.splice(randomIndex4, 1)[0]
//     playingallTiles.push(randomCard4)
//     container.appendChild(randomCard4)

//     console.log(playingallTiles[0])
    
//     return playingallTiles
// }

// const fourCards = dealFourCards()

// function iteratePatches() {
//     for (let i = 0; i < smallPatches.length; i++) {
//         let eachPatch = smallPatches[i]
//         eachPatch.addEventListener('click', function() {
//             // const fourCards = dealFourCards()
            
//             eachPatch.appendChild(fourCards[0])
//             console.log('trying')
//         })

//     }
// }


// // Grabs patches and handles what to do when you click them
// const patches = document.querySelectorAll('.patch')
// const smallPatches = document.querySelectorAll('.small-patch')

// for (let i = 0; i < patches.length; i++) {
//     patches[i].addEventListener('click', function(){patches[i].innerText = 'clicked'})
// }

// for (let i = 0; i < smallPatches.length; i++) {
//     smallPatches[i].addEventListener('click', function(){smallPatches[i].innerText = 'clicked'})
// }


// // Grab buttons
// const play = document.querySelector('#play')
// play.addEventListener('click', dealTiles)

// // Grabs tiles
// // const tiles = document.querySelectorAll('.tile')

// // console.log(tiles)

// // Deals the tiles at the start of the game
// function dealTiles() {
//     console.log('inside of DealTiles')
//     tiles[0]
//     // tiles[0].removeAttribute = 'display';
//     // tiles[0].style.visibility = 'visible';
//     console.log(tiles[0])
//     tiles[1].style.visibility = 'visible';
//     tiles[2].style.visibility = 'visible';
//     tiles[3].style.visibility = 'visible';
// }

// class Tile {
//     constructor(color, shape, number) {
//         this.color = color;
//         this.shape = shape;
//         this.number = number;
//     }
// }

// const array = [
//     {
//         color: 'red',
//         numbers: ['one', 'two', 'three', 'four'],
//         shapes: ['triange', 'square', 'circle', 'hexagon']
//     },
//     {
//         color: 'blue',
//         numbers: ['one', 'two', 'three', 'four'],
//         shapes: ['triange', 'square', 'circle', 'hexagon']
//     },
//     {
//         color: 'yellow',
//         numbers: ['one', 'two', 'three', 'four'],
//         shapes: ['triange', 'square', 'circle', 'hexagon']
//     },
//     {
//         color: 'green',
//         numbers: ['one', 'two', 'three', 'four'],
//         shapes: ['triange', 'square', 'circle', 'hexagon']
//     }
// ]

// function generateCards(array) {
//     const cardsArray = [];
//     for (let i = 0; i <array.length; i++) {
//         const newElement = document.createElement('div')
//         newElement.classList.add('tile')
//         let obj = array[i];
//         let color = obj.color;
//         newElement.classList.add(color);
//         let shapes = obj.shapes;
//         let numbers = obj.numbers;
//         for (let j = 0; j < numbers.length; j++) {
//             let eachNumber = numbers[j];
//             newElement.classList.add(eachNumber);
//             cardsArray.push(newElement);
//             for (let k = 0; k < shapes.length; k++) {
//                 let eachShape = shapes[k];
//                 newElement.classList.add(eachShape);
//                 cardsArray.push(newElement);
//             }
//         }
//     }
//     return cardsArray;
// }

// const cards = generateCards(array);
// console.log(cards)

// const tiles = document.querySelector('.tiles')
// tiles.appendChild(cards[0])