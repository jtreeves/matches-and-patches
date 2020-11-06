const main = document.querySelector('body')

const container = document.querySelector('.container')

const smallPatches = document.querySelectorAll('.small-patch')




const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

function generate16Tiles(color, shapesArray) {
    const tilesArray = [];
    
    for (let i = 0; i < 4; i++) {
        let eachShape = shapesArray[i];

        for (let j = 0; j < 4; j++) {
            const newTile = document.createElement('div');
            newTile.classList.add('tile', color, eachShape);
            tilesArray.push(newTile);
        }
    }
    
    tilesArray.forEach((tile, idx) => {
        if (idx === 0 || idx === 4 || idx === 8 || idx === 12) {
            tile.classList.add('one');
        } else if (idx === 1 || idx === 5 || idx === 9 || idx === 13) {
            tile.classList.add('two');
        } else if (idx === 2 || idx === 6 || idx === 10 || idx === 14) {
            tile.classList.add('three');
        } else if (idx === 3 || idx === 7 || idx === 11 || idx === 15) {
            tile.classList.add('four');
        }
    });

    console.log(tilesArray);
    return tilesArray;
}

const redTiles = generate16Tiles('red', ['triangle', 'square', 'circle', 'hexagon']);
const blueTiles = generate16Tiles('blue', ['triangle', 'square', 'circle', 'hexagon']);
const yellowTiles = generate16Tiles('yellow', ['triangle', 'square', 'circle', 'hexagon']);
const greenTiles = generate16Tiles('green', ['triangle', 'square', 'circle', 'hexagon']);

const allTiles = [...redTiles, ...blueTiles, ...yellowTiles, ...greenTiles];
console.log(allTiles);

document.addEventListener('DOMContentLoaded', iteratePatches)

function dealFourCards() {
    const playingallTiles = []

    randomIndex1 = Math.floor(Math.random()*allTiles.length)
    randomCard1 = allTiles.splice(randomIndex1, 1)[0]
    playingallTiles.push(randomCard1)
    console.log(randomCard1)
    container.appendChild(randomCard1)

    randomIndex2 = Math.floor(Math.random()*allTiles.length)
    randomCard2 = allTiles.splice(randomIndex2, 1)[0]
    playingallTiles.push(randomCard2)
    container.appendChild(randomCard2)

    randomIndex3 = Math.floor(Math.random()*allTiles.length)
    randomCard3 = allTiles.splice(randomIndex3, 1)[0]
    playingallTiles.push(randomCard3)
    container.appendChild(randomCard3)

    randomIndex4 = Math.floor(Math.random()*allTiles.length)
    randomCard4 = allTiles.splice(randomIndex4, 1)[0]
    playingallTiles.push(randomCard4)
    container.appendChild(randomCard4)

    console.log(playingallTiles[0])
    
    return playingallTiles
}

const fourCards = dealFourCards()

function iteratePatches() {
    for (let i = 0; i < smallPatches.length; i++) {
        let eachPatch = smallPatches[i]
        eachPatch.addEventListener('click', function() {
            // const fourCards = dealFourCards()
            
            eachPatch.appendChild(fourCards[0])
            console.log('trying')
        })

    }
}


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