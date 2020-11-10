// Select patch on board and tile from user's tiles

let userPatch = ''

function selectPatch() {
    for (let i = 0; i < smallPatches.length; i++) {
        if (smallPatches[i].status === 'inactive') {
            smallPatches[i].div.addEventListener('click', function() {
                userPatch = smallPatches[i]
                userPatch.status = 'user active'
                feedback(`User Patch: ${userPatch.name}`)
            })
        }
    }
    return userPatch
}

let userTile = ''

function selectTile() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].status === 'user') {
            tiles[i].div.addEventListener('click', function() {
                userTile = tiles[i]
                userTile.status = 'user active'
                feedback(`User Tile: ${userTile.name}`)
            })
        }
    }
    return userTile
}

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
        feedback(`Opponent Patch: ${opponentPatch.name}`)
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
        feedback(`Opponent Tile: ${opponentTile.name}`)
    } else {
        opponentTile = randomTile()
    }
    return opponentTile
}