// Grabs patches and handles what to do when you click them
const patches = document.querySelectorAll('.patch')
const smallPatches = document.querySelectorAll('.small-patch')

for (let i = 0; i < patches.length; i++) {
    patches[i].addEventListener('click', function(){patches[i].innerText = 'clicked'})
}

for (let i = 0; i < smallPatches.length; i++) {
    smallPatches[i].addEventListener('click', function(){smallPatches[i].innerText = 'clicked'})
}


// Grab buttons
const play = document.querySelector('#play')
play.addEventListener('click', dealTiles)

// Grabs tiles
const tiles = document.querySelectorAll('.tile')

console.log(tiles)

// Deals the tiles at the start of the game
function dealTiles() {
    console.log('inside of DealTiles')
    tiles[0]
    // tiles[0].removeAttribute = 'display';
    // tiles[0].style.visibility = 'visible';
    console.log(tiles[0])
    tiles[1].style.visibility = 'visible';
    tiles[2].style.visibility = 'visible';
    tiles[3].style.visibility = 'visible';
}