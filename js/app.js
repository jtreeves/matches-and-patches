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
play.addEventListener('click', dealTiles())

// Grabs tiles
const tiles = document.querySelectorAll('.tile')

// Deals the tiles at the start of the game
function dealTiles() {
    tiles[0].style.display = '';
    tiles[1].style.display = '';
    tiles[2].style.display = '';
    tiles[3].style.display = '';
}