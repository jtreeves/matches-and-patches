const main = document.querySelector('body')

const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

document.addEventListener('DOMContentLoaded', addElement)
function addElement() {
    const newDiv1 = document.createElement('div')
    newDiv1.textContent = cards[Math.floor(Math.random()*8)]
    main.appendChild(newDiv1)
    const newDiv2 = document.createElement('div')
    newDiv2.textContent = cards[Math.floor(Math.random()*8)]
    main.appendChild(newDiv2)
    const newDiv3 = document.createElement('div')
    newDiv3.textContent = cards[Math.floor(Math.random()*8)]
    main.appendChild(newDiv3)
    const newDiv4 = document.createElement('div')
    newDiv4.textContent = cards[Math.floor(Math.random()*8)]
    main.appendChild(newDiv4)
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